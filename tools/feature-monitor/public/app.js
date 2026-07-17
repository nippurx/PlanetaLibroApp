const statuses = ['idea', 'candidate', 'planned', 'in-progress', 'on-hold', 'completed', 'discarded'];
const priorities = ['critical', 'high', 'medium', 'low', 'none'];
const labels = {
  idea: 'Idea', candidate: 'Candidata', planned: 'Planificada', 'in-progress': 'En curso',
  'on-hold': 'En pausa', completed: 'Completada', discarded: 'Descartada',
  critical: 'Crítica', high: 'Alta', medium: 'Media', low: 'Baja', none: 'Sin prioridad'
};
const weight = Object.fromEntries(priorities.map((value, index) => [value, index]));
const state = { features: [] };
const $ = (selector) => document.querySelector(selector);

function option(value, selected) {
  const node = document.createElement('option');
  node.value = value; node.textContent = labels[value] || value; node.selected = value === selected;
  return node;
}

function progressText(progress) {
  if (!progress) return 'Sin change asociado';
  if (progress.state === 'active') return `${progress.complete}/${progress.total} tareas`;
  if (progress.state === 'archived') return 'Change archivado';
  return 'Change no disponible';
}

async function save(id, field, value, select) {
  select.disabled = true;
  $('#feedback').textContent = `Guardando ${id}…`;
  try {
    const feature = state.features.find((item) => item.id === id && item.project.id === select.dataset.project);
    const response = await fetch(`/api/projects/${feature.project.id}/features/${id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ [field]: value }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    Object.assign(feature, result);
    $('#feedback').textContent = `${feature.key} actualizado correctamente.`;
    render();
  } catch (error) {
    $('#feedback').textContent = `No se pudo guardar: ${error.message}`;
    await load();
  } finally { select.disabled = false; }
}

function card(feature) {
  const article = document.createElement('article');
  article.className = `card priority-${feature.priority}`;
  const heading = document.createElement('div'); heading.className = 'card-heading';
  heading.innerHTML = `<div><span class="id"></span><h2></h2></div><div class="badges"><span class="project"></span><span class="area"></span></div>`;
  heading.querySelector('.id').textContent = feature.key;
  heading.querySelector('h2').textContent = feature.title;
  heading.querySelector('.area').textContent = feature.area;
  heading.querySelector('.project').textContent = feature.project.name;
  const summary = document.createElement('p'); summary.className = 'description'; summary.textContent = feature.summary;
  const controls = document.createElement('div'); controls.className = 'controls';
  for (const [field, values, title] of [['priority', priorities, 'Prioridad'], ['status', statuses, 'Estado']]) {
    const label = document.createElement('label'); label.innerHTML = `<span>${title}</span>`;
    const select = document.createElement('select'); select.setAttribute('aria-label', `${title} de ${feature.title}`);
    select.dataset.project = feature.project.id;
    values.forEach((value) => select.append(option(value, feature[field])));
    select.addEventListener('change', () => save(feature.id, field, select.value, select));
    label.append(select); controls.append(label);
  }
  const footer = document.createElement('footer');
  const progress = document.createElement('span'); progress.className = `progress ${feature.progress?.state || 'none'}`; progress.textContent = progressText(feature.progress);
  const change = document.createElement('code'); change.textContent = feature.openspec_change || 'sin-openspec';
  footer.append(progress, change); article.append(heading, summary, controls, footer); return article;
}

function filtered() {
  const query = $('#search').value.trim().toLocaleLowerCase('es');
  const project = $('#project-filter').value, status = $('#status-filter').value, priority = $('#priority-filter').value, area = $('#area-filter').value;
  const result = state.features.filter((feature) => (!query || [feature.key, feature.title, feature.summary, feature.area, feature.project.name].some((text) => text.toLocaleLowerCase('es').includes(query))) && (!project || feature.project.id === project) && (!status || feature.status === status) && (!priority || feature.priority === priority) && (!area || feature.area === area));
  const sort = $('#sort').value;
  return result.sort(sort === 'priority' ? (a, b) => weight[a.priority] - weight[b.priority] || a.title.localeCompare(b.title) : sort === 'updated' ? (a, b) => b.updated_at.localeCompare(a.updated_at) : (a, b) => a.title.localeCompare(b.title));
}

function render() {
  const features = filtered(), container = $('#features'); container.replaceChildren(...features.map(card));
  $('#visible-count').textContent = features.length; $('#empty').hidden = features.length !== 0;
}

async function load() {
  try {
    const response = await fetch('/api/features'); const result = await response.json();
    if (!response.ok) throw new Error(result.error); state.features = result.features;
    $('#project-filter').replaceChildren(option('', ''), ...result.projects.filter((project) => project.enabled).map((project) => option(project.id, '')));
    const areas = [...new Set(state.features.map((feature) => feature.area))].sort();
    $('#area-filter').replaceChildren(option('', ''), ...areas.map((area) => option(area, '')));
    const errors = $('#project-errors'); errors.hidden = result.errors.length === 0;
    errors.replaceChildren(...result.errors.map((issue) => { const item = document.createElement('p'); item.textContent = `${issue.project_name}: ${issue.error}`; return item; }));
    render(); $('#feedback').textContent = `${state.features.length} features de ${result.projects.filter((project) => project.enabled).length} proyectos cargadas.`;
  } catch (error) { $('#feedback').textContent = `No se pudo cargar el portfolio: ${error.message}`; $('#empty').hidden = false; }
}

statuses.forEach((value) => $('#status-filter').append(option(value, '')));
priorities.forEach((value) => $('#priority-filter').append(option(value, '')));
['search', 'project-filter', 'status-filter', 'priority-filter', 'area-filter', 'sort'].forEach((id) => $(`#${id}`).addEventListener('input', render));
load();
