import { readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const STATUSES = ['idea', 'candidate', 'planned', 'in-progress', 'on-hold', 'completed', 'discarded'];
export const PRIORITIES = ['critical', 'high', 'medium', 'low', 'none'];
const ID_PATTERN = /^FEAT-\d{3,}$/;
const CHANGE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertString(value, field) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${field} debe ser texto no vacío`);
}

export function validateRegistry(registry) {
  if (!registry || registry.schema_version !== 1 || !Array.isArray(registry.features)) {
    throw new Error('El backlog no cumple el esquema versión 1');
  }
  const ids = new Set();
  for (const feature of registry.features) {
    assertString(feature.id, 'id');
    assertString(feature.title, 'title');
    assertString(feature.summary, 'summary');
    assertString(feature.area, 'area');
    if (!ID_PATTERN.test(feature.id) || ids.has(feature.id)) throw new Error(`ID inválido o duplicado: ${feature.id}`);
    if (!STATUSES.includes(feature.status)) throw new Error(`Estado inválido en ${feature.id}`);
    if (!PRIORITIES.includes(feature.priority)) throw new Error(`Prioridad inválida en ${feature.id}`);
    if (!Array.isArray(feature.notes) || feature.notes.some((note) => typeof note !== 'string')) throw new Error(`Notas inválidas en ${feature.id}`);
    if (feature.openspec_change !== null && !CHANGE_PATTERN.test(feature.openspec_change)) throw new Error(`Change inválido en ${feature.id}`);
    ids.add(feature.id);
  }
  return registry;
}

export async function readRegistry(file) {
  return validateRegistry(JSON.parse(await readFile(file, 'utf8')));
}

export async function writeRegistry(file, registry) {
  validateRegistry(registry);
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');
  await rename(temporary, file);
}

export async function updateFeature(file, id, patch, today = new Date().toISOString().slice(0, 10)) {
  const allowed = new Set(['priority', 'status']);
  if (!patch || Object.keys(patch).length === 0 || Object.keys(patch).some((key) => !allowed.has(key))) {
    throw new Error('Solo se pueden actualizar status y priority');
  }
  const registry = await readRegistry(file);
  const feature = registry.features.find((item) => item.id === id);
  if (!feature) throw new Error('Feature no encontrada');
  if ('priority' in patch && !PRIORITIES.includes(patch.priority)) throw new Error('Prioridad inválida');
  if ('status' in patch && !STATUSES.includes(patch.status)) throw new Error('Estado inválido');
  Object.assign(feature, patch, { updated_at: today });
  registry.updated_at = today;
  await writeRegistry(file, registry);
  return feature;
}

export async function getProgress(repoRoot, change) {
  if (!change || !CHANGE_PATTERN.test(change)) return null;
  const activeTasks = path.join(repoRoot, 'openspec', 'changes', change, 'tasks.md');
  const archivedRoot = path.join(repoRoot, 'openspec', 'changes', 'archive');
  try {
    const contents = await readFile(activeTasks, 'utf8');
    const tasks = contents.match(/^- \[[ xX]\]/gm) ?? [];
    const complete = tasks.filter((task) => /^- \[[xX]\]/.test(task)).length;
    return { state: 'active', complete, total: tasks.length };
  } catch (error) {
    if (error.code !== 'ENOENT') return { state: 'unavailable' };
  }
  try {
    const { readdir } = await import('node:fs/promises');
    const entries = await readdir(archivedRoot, { withFileTypes: true });
    if (entries.some((entry) => entry.isDirectory() && (entry.name === change || entry.name.endsWith(`-${change}`)))) return { state: 'archived' };
  } catch {}
  return { state: 'unavailable' };
}

export async function projectRegistry(registry, repoRoot) {
  return { ...registry, features: await Promise.all(registry.features.map(async (feature) => ({ ...feature, progress: await getProgress(repoRoot, feature.openspec_change) }))) };
}
