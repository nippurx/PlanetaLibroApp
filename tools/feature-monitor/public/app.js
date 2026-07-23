const options = {
  priority: ['critical', 'high', 'medium', 'low', 'none'], urgency: ['immediate', 'high', 'normal', 'low'],
  importance: ['critical', 'high', 'medium', 'low'], effort: ['small', 'medium', 'large']
};
const labels = {
  critical: 'Crítica', high: 'Alta', medium: 'Media', low: 'Baja', none: 'Sin prioridad',
  immediate: 'Inmediata', normal: 'Normal', small: 'Pequeño', large: 'Grande',
  active: 'Activo', archived: 'Archivado'
};
const score = {
  priority: { critical: 400, high: 300, medium: 200, low: 100, none: 0 },
  urgency: { immediate: 40, high: 30, normal: 20, low: 10 },
  importance: { critical: 40, high: 30, medium: 20, low: 10 },
  effort: { small: 3, medium: 2, large: 1 }
};
const state = { dashboard: null };
const $ = (selector) => document.querySelector(selector);

function text(element, value) { element.textContent = value; return element; }
function node(tag, className, value) { const element = document.createElement(tag); if (className) element.className = className; if (value !== undefined) text(element, value); return element; }
function label(value) { return labels[value] || value; }
function status(change) { if (change.task_state === 'unavailable') return 'unavailable'; if (change.assessment.blocked && change.pending) return 'blocked'; return change.pending ? 'pending' : 'complete'; }
function progress(change) { return change.task_state === 'available' ? `${change.complete}/${change.total} tareas` : 'Tareas no disponibles'; }

function changeMetrics(change) {
  const metrics = node('div', 'change-metrics');
  if (change.task_state !== 'available') { metrics.append(node('span', 'metric unavailable', 'Tareas no disponibles')); return metrics; }
  const percentage = change.total ? Math.round((change.complete / change.total) * 100) : 0;
  metrics.append(
    node('span', 'metric progress', `${percentage}% avance`),
    node('span', 'metric complete', `${change.complete} hechas`),
    node('span', 'metric pending', `${change.pending} pendientes`)
  );
  return metrics;
}

function stat(value, caption, accent = '') {
  const item = node('div', `stat ${accent}`); item.append(node('strong', '', value), node('span', '', caption)); return item;
}

function renderOverview() {
  const summary = state.dashboard.summary, root = $('#overview');
  root.replaceChildren(
    stat(summary.active, 'changes activos'), stat(summary.pending, 'tareas pendientes', 'attention'),
    stat(`${summary.complete}/${summary.tasks}`, 'tareas completadas'), stat(summary.blocked, 'changes bloqueados', summary.blocked ? 'danger' : ''),
    stat(summary.archived, 'changes archivados')
  );
}

function renderRecommendation() {
  const root = $('#recommendation'), recommended = state.dashboard.recommendation;
  root.replaceChildren();
  const heading = node('div', 'recommendation-heading'); heading.append(node('p', 'eyebrow', 'Siguiente recomendado'), node('h2', '', recommended ? recommended.slug : 'No hay un siguiente change elegible'));
  root.append(heading);
  if (!recommended) { root.append(node('p', 'muted', 'No hay un change activo, pendiente y no bloqueado con prioridad asignada. Evaluá los changes para obtener una recomendación confiable.')); return; }
  const change = state.dashboard.changes.find((item) => item.slug === recommended.slug);
  const details = node('p', 'muted', `${change.pending} tareas pendientes · prioridad ${label(change.assessment.priority)} · urgencia ${label(change.assessment.urgency)} · importancia ${label(change.assessment.importance)} · esfuerzo ${label(change.assessment.effort)}.`);
  const explanation = node('p', 'explanation', `Puntaje ${recommended.score}: prioridad ${recommended.factors.priority}, urgencia ${recommended.factors.urgency}, importancia ${recommended.factors.importance} y esfuerzo ${recommended.factors.effort}.`);
  root.append(details, explanation);
}

function selectField(field, current) {
  const select = document.createElement('select'); select.name = field; select.setAttribute('aria-label', field);
  for (const value of options[field]) { const item = document.createElement('option'); item.value = value; text(item, label(value)); item.selected = value === current; select.append(item); }
  return select;
}

function assessmentForm(change) {
  const form = node('form', 'assessment'); form.dataset.slug = change.slug;
  const title = node('p', 'assessment-title', 'Evaluación operativa');
  const fields = node('div', 'assessment-fields');
  for (const field of ['priority', 'urgency', 'importance', 'effort']) {
    const wrapper = document.createElement('label'); wrapper.append(node('span', '', field === 'priority' ? 'Prioridad' : field === 'urgency' ? 'Urgencia' : field === 'importance' ? 'Importancia' : 'Esfuerzo'), selectField(field, change.assessment[field])); fields.append(wrapper);
  }
  const blocked = document.createElement('label'); blocked.className = 'blocked-toggle'; const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.name = 'blocked'; checkbox.checked = change.assessment.blocked; blocked.append(checkbox, document.createTextNode('Bloqueado: no recomendar como siguiente trabajo'));
  const note = document.createElement('label'); note.className = 'note'; const textarea = document.createElement('textarea'); textarea.name = 'note'; textarea.maxLength = 600; textarea.rows = 2; textarea.placeholder = 'Motivo, dependencia o decisión de priorización…'; textarea.value = change.assessment.note; note.append(node('span', '', 'Nota de decisión'), textarea);
  const submit = node('button', 'save', 'Guardar evaluación'); submit.type = 'submit';
  form.append(title, fields, blocked, note, submit); form.addEventListener('submit', saveAssessment); return form;
}

function taskList(change) {
  const root = node('div', 'task-section'); root.append(node('h3', '', 'Tareas leídas desde OpenSpec'));
  if (change.task_state === 'unavailable') { root.append(node('p', 'muted', 'Este change no tiene un tasks.md disponible.')); return root; }
  if (!change.tasks.length) { root.append(node('p', 'muted', 'El tasks.md no contiene checkboxes detectables.')); return root; }
  const list = node('ol', 'task-list');
  for (const task of change.tasks) { const item = node('li', task.complete ? 'done' : 'todo'); item.append(node('span', 'check', task.complete ? 'Hecha' : 'Pendiente'), document.createTextNode(task.text)); list.append(item); }
  root.append(list); return root;
}

function proposalPanel(change) {
  const panel = node('details', 'proposal-panel');
  const heading = node('summary', '', 'Propuesta completa');
  panel.append(heading);
  if (!change.proposal) { panel.append(node('p', 'muted', 'Este change no tiene un proposal.md disponible.')); return panel; }
  panel.append(node('pre', 'proposal-text', change.proposal));
  return panel;
}

function applyPanel(change) {
  const panel = node('details', 'apply-panel'); panel.append(node('summary', '', 'Siguiente paso con OpenSpec'));
  const command = node('code', 'apply-command', `/opsx:apply ${change.slug}`);
  const instruction = node('pre', 'apply-instruction', 'Abrí esta sección para cargar las instrucciones locales de OpenSpec.');
  panel.append(command, instruction);
  panel.addEventListener('toggle', async () => {
    if (!panel.open || panel.dataset.loaded) return;
    panel.dataset.loaded = 'true'; instruction.textContent = 'Cargando instrucciones OpenSpec…';
    try {
      const response = await fetch(`/api/changes/${change.slug}/apply-guidance`); const result = await response.json();
      if (!response.ok) throw new Error(result.error); instruction.textContent = result.instruction;
    } catch (error) { instruction.textContent = `No se pudieron cargar las instrucciones: ${error.message}`; }
  });
  return panel;
}

function changeCard(change) {
  const detail = node('details', `change ${status(change)}`); detail.open = state.dashboard.recommendation?.slug === change.slug;
  const summary = document.createElement('summary');
  const title = node('div', 'change-title'); title.append(node('code', '', change.slug), node('p', 'change-description', change.description || 'Sin descripción disponible en proposal.md.'), node('strong', '', progress(change)), changeMetrics(change));
  const badges = node('div', 'badges'); badges.append(node('span', `badge ${change.location}`, label(change.location)), node('span', 'badge', change.assessment.blocked ? 'Bloqueado' : label(change.assessment.priority)));
  summary.append(title, badges); detail.append(summary);
  const content = node('div', 'change-content');
  const artifacts = node('p', 'artifacts', `Artifacts: propuesta ${change.artifacts.proposal ? '✓' : '—'} · diseño ${change.artifacts.design ? '✓' : '—'} · specs ${change.artifacts.specs ? '✓' : '—'} · tareas ${change.artifacts.tasks ? '✓' : '—'}`);
  content.append(artifacts, proposalPanel(change), applyPanel(change), taskList(change), assessmentForm(change)); detail.append(content); return detail;
}

function filteredChanges() {
  const query = $('#search').value.trim().toLocaleLowerCase('es'), location = $('#location-filter').value, work = $('#work-filter').value, sort = $('#sort').value;
  const recommended = state.dashboard.recommendation?.slug;
  const changes = state.dashboard.changes.filter((change) => (!query || change.slug.toLocaleLowerCase('es').includes(query)) && (!location || change.location === location) && (!work || status(change) === work));
  return changes.sort((a, b) => {
    if (sort === 'name') return a.slug.localeCompare(b.slug);
    if (sort === 'pending') return b.pending - a.pending || a.slug.localeCompare(b.slug);
    if (sort === 'progress') return (a.total ? a.complete / a.total : 2) - (b.total ? b.complete / b.total : 2) || a.slug.localeCompare(b.slug);
    const aScore = a.slug === recommended ? 10000 : score.priority[a.assessment.priority] + score.urgency[a.assessment.urgency] + score.importance[a.assessment.importance] + score.effort[a.assessment.effort];
    const bScore = b.slug === recommended ? 10000 : score.priority[b.assessment.priority] + score.urgency[b.assessment.urgency] + score.importance[b.assessment.importance] + score.effort[b.assessment.effort];
    return bScore - aScore || a.slug.localeCompare(b.slug);
  });
}

function renderChanges() {
  const changes = filteredChanges(); $('#changes').replaceChildren(...changes.map(changeCard)); $('#empty').hidden = changes.length !== 0;
}

async function saveAssessment(event) {
  event.preventDefault(); const form = event.currentTarget, button = form.querySelector('button'); button.disabled = true; text(button, 'Guardando…');
  const data = new FormData(form); const assessment = Object.fromEntries(data.entries()); assessment.blocked = form.elements.blocked.checked;
  try {
    const response = await fetch(`/api/changes/${form.dataset.slug}/assessment`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(assessment) });
    const result = await response.json(); if (!response.ok) throw new Error(result.error);
    $('#feedback').textContent = `${form.dataset.slug}: evaluación guardada.`; await load();
  } catch (error) { $('#feedback').textContent = `No se pudo guardar: ${error.message}`; }
  finally { button.disabled = false; text(button, 'Guardar evaluación'); }
}

async function load() {
  try {
    const response = await fetch('/api/dashboard'); const result = await response.json(); if (!response.ok) throw new Error(result.error);
    state.dashboard = result; renderOverview(); renderRecommendation(); renderChanges(); $('#feedback').textContent = `${result.summary.active} changes activos y ${result.summary.pending} tareas pendientes.`;
  } catch (error) { $('#feedback').textContent = `No se pudo cargar el tablero: ${error.message}`; $('#empty').hidden = false; }
}

['search', 'location-filter', 'work-filter', 'sort'].forEach((id) => $(`#${id}`).addEventListener('input', () => state.dashboard && renderChanges()));
load();
