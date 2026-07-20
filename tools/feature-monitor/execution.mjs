import { access, mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const PRIORITIES = ['critical', 'high', 'medium', 'low', 'none'];
export const URGENCIES = ['immediate', 'high', 'normal', 'low'];
export const IMPORTANCES = ['critical', 'high', 'medium', 'low'];
export const EFFORTS = ['small', 'medium', 'large'];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DEFAULT_ASSESSMENT = Object.freeze({ priority: 'none', urgency: 'normal', importance: 'medium', effort: 'medium', blocked: false, note: '' });
const priorityScore = { critical: 400, high: 300, medium: 200, low: 100, none: 0 };
const urgencyScore = { immediate: 40, high: 30, normal: 20, low: 10 };
const importanceScore = { critical: 40, high: 30, medium: 20, low: 10 };
const effortScore = { small: 3, medium: 2, large: 1 };

async function exists(file) { try { await access(file); return true; } catch { return false; } }
function taskFile(changeRoot) { return path.join(changeRoot, 'tasks.md'); }

export function parseTasks(markdown) {
  const tasks = [];
  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^\s*[-*+]\s+\[([ xX])\]\s+(.+?)\s*$/);
    if (match) tasks.push({ ordinal: tasks.length + 1, complete: /[xX]/.test(match[1]), text: match[2] });
  }
  return tasks;
}

export function proposalDescription(markdown) {
  const lines = markdown.split(/\r?\n/);
  const whyIndex = lines.findIndex((line) => /^##\s+why\s*$/i.test(line));
  const source = whyIndex >= 0 ? lines.slice(whyIndex + 1) : lines;
  const paragraph = [];
  for (const line of source) {
    const value = line.replace(/<!--.*?-->/g, '').trim();
    if (!value) { if (paragraph.length) break; continue; }
    if (/^#/.test(value)) { if (paragraph.length) break; continue; }
    paragraph.push(value);
  }
  return paragraph.length ? paragraph.join(' ').replace(/\s+/g, ' ') : null;
}

async function artifactAvailability(changeRoot) {
  const specsRoot = path.join(changeRoot, 'specs');
  return {
    proposal: await exists(path.join(changeRoot, 'proposal.md')),
    design: await exists(path.join(changeRoot, 'design.md')),
    specs: await exists(specsRoot),
    tasks: await exists(taskFile(changeRoot))
  };
}

async function changeDirectories(root, location) {
  try {
    const entries = await readdir(root, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory() && SLUG.test(entry.name)).map((entry) => ({ slug: entry.name, root: path.join(root, entry.name), location }));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function readChange(item, assessments) {
  const availability = await artifactAvailability(item.root);
  let tasks = [], taskState = 'unavailable';
  let description = null;
  let proposal = null;
  if (availability.proposal) {
    try { proposal = await readFile(path.join(item.root, 'proposal.md'), 'utf8'); description = proposalDescription(proposal); } catch {}
  }
  if (availability.tasks) {
    try { tasks = parseTasks(await readFile(taskFile(item.root), 'utf8')); taskState = 'available'; } catch { taskState = 'unavailable'; }
  }
  const complete = tasks.filter((task) => task.complete).length;
  return {
    slug: item.slug,
    location: item.location,
    description,
    proposal,
    artifacts: availability,
    task_state: taskState,
    tasks,
    complete,
    total: tasks.length,
    pending: Math.max(0, tasks.length - complete),
    assessment: { ...DEFAULT_ASSESSMENT, ...(assessments[item.slug] || {}) }
  };
}

export function validateAssessments(document) {
  if (!document || document.schema_version !== 1 || !document.assessments || Array.isArray(document.assessments) || typeof document.assessments !== 'object') {
    throw new Error('Las evaluaciones no cumplen el esquema versión 1');
  }
  for (const [slug, assessment] of Object.entries(document.assessments)) validateAssessment(slug, assessment);
  return document;
}

export function validateAssessment(slug, assessment) {
  if (!SLUG.test(slug)) throw new Error('Change inválido');
  if (!assessment || typeof assessment !== 'object' || Array.isArray(assessment)) throw new Error('Evaluación inválida');
  const allowed = new Set(['priority', 'urgency', 'importance', 'effort', 'blocked', 'note']);
  if (Object.keys(assessment).some((key) => !allowed.has(key))) throw new Error('La evaluación contiene campos no permitidos');
  if (!PRIORITIES.includes(assessment.priority)) throw new Error('Prioridad inválida');
  if (!URGENCIES.includes(assessment.urgency)) throw new Error('Urgencia inválida');
  if (!IMPORTANCES.includes(assessment.importance)) throw new Error('Importancia inválida');
  if (!EFFORTS.includes(assessment.effort)) throw new Error('Esfuerzo inválido');
  if (typeof assessment.blocked !== 'boolean') throw new Error('Bloqueo inválido');
  if (typeof assessment.note !== 'string' || assessment.note.length > 600) throw new Error('La nota debe tener hasta 600 caracteres');
  return assessment;
}

export async function readAssessments(file) {
  try { return validateAssessments(JSON.parse(await readFile(file, 'utf8'))); }
  catch (error) { if (error.code === 'ENOENT') return { schema_version: 1, assessments: {} }; throw error; }
}

export async function writeAssessments(file, document) {
  validateAssessments(document);
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(document, null, 2)}\n`, 'utf8');
  await rename(temporary, file);
}

export function recommendationFor(changes) {
  const candidates = changes.filter((change) => change.location === 'active' && change.task_state === 'available' && change.pending > 0 && !change.assessment.blocked && change.assessment.priority !== 'none')
    .map((change) => {
      const factors = {
        priority: priorityScore[change.assessment.priority], urgency: urgencyScore[change.assessment.urgency],
        importance: importanceScore[change.assessment.importance], effort: effortScore[change.assessment.effort], pending: change.pending
      };
      return { slug: change.slug, score: factors.priority + factors.urgency + factors.importance + factors.effort, factors };
    });
  candidates.sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
  return candidates[0] || null;
}

export async function readDashboard(repoRoot, assessmentFile) {
  const assessments = await readAssessments(assessmentFile);
  const activeRoot = path.join(repoRoot, 'openspec', 'changes');
  const archivedRoot = path.join(activeRoot, 'archive');
  const [activeEntries, archived] = await Promise.all([changeDirectories(activeRoot, 'active'), changeDirectories(archivedRoot, 'archived')]);
  const active = activeEntries.filter((item) => item.slug !== 'archive');
  const changes = await Promise.all([...active, ...archived].map((item) => readChange(item, assessments.assessments)));
  changes.sort((a, b) => a.location.localeCompare(b.location) || a.slug.localeCompare(b.slug));
  const activeChanges = changes.filter((change) => change.location === 'active');
  return {
    changes,
    summary: {
      changes: changes.length,
      active: activeChanges.length,
      archived: changes.length - activeChanges.length,
      tasks: activeChanges.filter((change) => change.task_state === 'available').reduce((sum, change) => sum + change.total, 0),
      complete: activeChanges.filter((change) => change.task_state === 'available').reduce((sum, change) => sum + change.complete, 0),
      pending: activeChanges.filter((change) => change.task_state === 'available').reduce((sum, change) => sum + change.pending, 0),
      blocked: activeChanges.filter((change) => change.assessment.blocked && change.pending > 0).length,
      unavailable: activeChanges.filter((change) => change.task_state === 'unavailable').length
    },
    recommendation: recommendationFor(changes)
  };
}

export async function updateAssessment(repoRoot, assessmentFile, slug, patch) {
  if (!SLUG.test(slug)) throw new Error('Change inválido');
  const dashboard = await readDashboard(repoRoot, assessmentFile);
  if (!dashboard.changes.some((change) => change.slug === slug)) throw new Error('Change no encontrado');
  validateAssessment(slug, patch);
  const document = await readAssessments(assessmentFile);
  document.assessments[slug] = { ...patch, note: patch.note.trim() };
  await writeAssessments(assessmentFile, document);
  return document.assessments[slug];
}
