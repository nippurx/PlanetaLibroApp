import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { getProgress, readRegistry, updateFeature, validateRegistry } from './registry.mjs';
import { aggregateProjects, ensureDefaultProject, readProjects, registerProject } from './projects.mjs';
import { createMonitorServer } from './server.mjs';

const feature = {
  id: 'FEAT-101', title: 'Prueba', summary: 'Feature de prueba', status: 'idea', priority: 'none',
  area: 'testing', created_at: '2026-07-17', updated_at: '2026-07-17', openspec_change: null, notes: []
};
const registry = () => ({ schema_version: 1, updated_at: '2026-07-17', features: [{ ...feature }] });

async function projectFixture(parent, name, title = name) {
  const root = path.join(parent, name); await mkdir(path.join(root, 'docs'), { recursive: true });
  const data = registry(); data.features[0].title = title;
  await writeFile(path.join(root, 'docs', 'features-backlog.json'), JSON.stringify(data)); return root;
}

test('valida el esquema y rechaza enumeraciones desconocidas', () => {
  assert.equal(validateRegistry(registry()).features.length, 1);
  const invalid = registry(); invalid.features[0].priority = 'urgente';
  assert.throws(() => validateRegistry(invalid), /Prioridad inválida/);
});

test('persiste status y priority con escritura JSON válida', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'feature-monitor-'));
  const file = path.join(root, 'backlog.json'); await writeFile(file, JSON.stringify(registry()));
  await updateFeature(file, 'FEAT-101', { priority: 'high', status: 'candidate' }, '2026-07-18');
  const saved = await readRegistry(file);
  assert.equal(saved.features[0].priority, 'high'); assert.equal(saved.features[0].status, 'candidate');
  assert.equal(saved.updated_at, '2026-07-18');
  const persisted = await readFile(file, 'utf8');
  assert.doesNotThrow(() => JSON.parse(persisted));
});

test('rechaza campos de mutación fuera de alcance', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'feature-monitor-'));
  const file = path.join(root, 'backlog.json'); await writeFile(file, JSON.stringify(registry()));
  await assert.rejects(updateFeature(file, 'FEAT-101', { title: 'Alterado' }), /Solo se pueden/);
});

test('deriva progreso de checkboxes de un change activo', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'feature-monitor-'));
  const change = path.join(root, 'openspec', 'changes', 'sample-change'); await mkdir(change, { recursive: true });
  await writeFile(path.join(change, 'tasks.md'), '- [x] Uno\n- [ ] Dos\nTexto\n- [X] Tres\n');
  assert.deepEqual(await getProgress(root, 'sample-change'), { state: 'active', complete: 2, total: 3 });
});

test('no acepta slugs que puedan escapar de changes', async () => {
  assert.equal(await getProgress('C:\\repo', '../secreto'), null);
});

test('registra proyectos explícitos y rechaza colisiones de ID o raíz', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'feature-monitor-')), config = path.join(temp, 'projects.json');
  const first = await projectFixture(temp, 'one'), second = await projectFixture(temp, 'two');
  await registerProject(config, { id: 'one', name: 'Uno', root: first });
  await assert.rejects(registerProject(config, { id: 'one', name: 'Dos', root: second }), /ya pertenece/);
  await assert.rejects(registerProject(config, { id: 'two', name: 'Dos', root: first }), /ya está registrada/);
  assert.equal((await readProjects(config)).projects.length, 1);
});

test('agrega IDs locales iguales con namespace de proyecto', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'feature-monitor-'));
  const one = await projectFixture(temp, 'one'), two = await projectFixture(temp, 'two');
  const result = await aggregateProjects({ schema_version: 1, projects: [
    { id: 'one', name: 'Uno', root: one, enabled: true }, { id: 'two', name: 'Dos', root: two, enabled: true }
  ] });
  assert.deepEqual(result.features.map((item) => item.key).sort(), ['one/FEAT-101', 'two/FEAT-101']);
});

test('aísla un backlog inválido sin ocultar proyectos saludables', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'feature-monitor-'));
  const good = await projectFixture(temp, 'good'), bad = path.join(temp, 'bad'); await mkdir(path.join(bad, 'docs'), { recursive: true });
  await writeFile(path.join(bad, 'docs', 'features-backlog.json'), '{}');
  const result = await aggregateProjects({ schema_version: 1, projects: [
    { id: 'good', name: 'Bueno', root: good, enabled: true }, { id: 'bad', name: 'Roto', root: bad, enabled: true }
  ] });
  assert.equal(result.features.length, 1); assert.equal(result.errors[0].project_id, 'bad');
});

test('la API escribe por namespace y rechaza proyectos desconocidos', async (t) => {
  const temp = await mkdtemp(path.join(tmpdir(), 'feature-monitor-')), config = path.join(temp, 'projects.json');
  const root = await projectFixture(temp, 'one'); await registerProject(config, { id: 'one', name: 'Uno', root });
  const server = createMonitorServer({ configFile: config }); await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const address = server.address(), base = `http://127.0.0.1:${address.port}`;
  const updated = await fetch(`${base}/api/projects/one/features/FEAT-101`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ priority: 'high' }) });
  assert.equal(updated.status, 200); assert.equal((await updated.json()).priority, 'high');
  const unknown = await fetch(`${base}/api/projects/missing/features/FEAT-101`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ priority: 'low' }) });
  assert.equal(unknown.status, 404);
});

test('migra solo la identidad errónea conocida de PlanetaLibroApp', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'feature-monitor-')), config = path.join(temp, 'projects.json');
  const appRoot = await projectFixture(temp, 'PlanetaLibroApp');
  await writeFile(config, JSON.stringify({ schema_version: 1, projects: [{ id: 'planeta-libro', name: 'PlanetaLibro', root: appRoot, enabled: true }] }));
  await ensureDefaultProject(config, { id: 'planeta-libro-app', name: 'PlanetaLibroApp', root: appRoot });
  const saved = await readProjects(config);
  assert.equal(saved.projects[0].id, 'planeta-libro-app'); assert.equal(saved.projects[0].name, 'PlanetaLibroApp');
});

test('no renombra un proyecto PHP PlanetaLibro ubicado en otra raíz', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'feature-monitor-')), config = path.join(temp, 'projects.json');
  const appRoot = await projectFixture(temp, 'PlanetaLibroApp'), phpRoot = await projectFixture(temp, 'PlanetaLibroPHP');
  await writeFile(config, JSON.stringify({ schema_version: 1, projects: [{ id: 'planeta-libro', name: 'PlanetaLibro', root: phpRoot, enabled: true }] }));
  await ensureDefaultProject(config, { id: 'planeta-libro-app', name: 'PlanetaLibroApp', root: appRoot });
  const saved = await readProjects(config);
  assert.equal(saved.projects[0].id, 'planeta-libro'); assert.equal(saved.projects[0].root, phpRoot);
});
