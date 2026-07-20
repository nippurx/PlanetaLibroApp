import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { parseTasks, proposalDescription, readDashboard, updateAssessment } from './execution.mjs';
import { createMonitorServer } from './server.mjs';
import { installDashboard } from './install.mjs';

async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'openspec-dashboard-'));
  const changes = path.join(root, 'openspec', 'changes');
  await mkdir(path.join(changes, 'urgent-fix'), { recursive: true });
  await mkdir(path.join(changes, 'blocked-work'), { recursive: true });
  await mkdir(path.join(changes, 'archive', 'old-change'), { recursive: true });
  await writeFile(path.join(changes, 'urgent-fix', 'proposal.md'), '## Why\n\nResolver la visibilidad del trabajo pendiente.\n\n## What Changes\n\n- Cambio.\n');
  await writeFile(path.join(changes, 'urgent-fix', 'tasks.md'), '- [x] Preparar\n- [ ] Resolver\n- [X] Validar\n');
  await writeFile(path.join(changes, 'blocked-work', 'tasks.md'), '- [ ] Esperar dependencia\n');
  await writeFile(path.join(changes, 'archive', 'old-change', 'tasks.md'), '- [x] Entregado\n');
  return { root, assessmentFile: path.join(root, 'docs', 'openspec-execution-assessments.json') };
}

test('detecta tareas Markdown y no cuenta prosa', () => {
  assert.deepEqual(parseTasks('- [x] Hecha\nTexto\n* [ ] Pendiente\n## Título\n'), [
    { ordinal: 1, complete: true, text: 'Hecha' }, { ordinal: 2, complete: false, text: 'Pendiente' }
  ]);
});

test('extrae la descripción breve desde la sección Why de la propuesta', () => {
  const proposal = '## Why\n\nResolver la falta de visibilidad del trabajo pendiente.\n\nUn segundo párrafo no integra el resumen.\n\n## What Changes\n\n- Cambio.';
  assert.equal(proposalDescription(proposal), 'Resolver la falta de visibilidad del trabajo pendiente.');
});

test('resume changes activos y archivados y recomienda trabajo no bloqueado', async () => {
  const { root, assessmentFile } = await fixture();
  await updateAssessment(root, assessmentFile, 'urgent-fix', { priority: 'critical', urgency: 'immediate', importance: 'high', effort: 'small', blocked: false, note: 'Resolver antes del próximo corte.' });
  await updateAssessment(root, assessmentFile, 'blocked-work', { priority: 'critical', urgency: 'immediate', importance: 'critical', effort: 'small', blocked: true, note: 'Falta proveedor.' });
  const dashboard = await readDashboard(root, assessmentFile);
  assert.equal(dashboard.summary.active, 2); assert.equal(dashboard.summary.archived, 1);
  assert.equal(dashboard.summary.pending, 2); assert.equal(dashboard.summary.blocked, 1);
  assert.equal(dashboard.recommendation.slug, 'urgent-fix');
  assert.equal(dashboard.changes.find((change) => change.slug === 'urgent-fix').complete, 2);
  assert.equal(dashboard.changes.find((change) => change.slug === 'urgent-fix').description, 'Resolver la visibilidad del trabajo pendiente.');
  assert.match(dashboard.changes.find((change) => change.slug === 'urgent-fix').proposal, /What Changes/);
});

test('no inventa una recomendación sin prioridad explícita', async () => {
  const { root, assessmentFile } = await fixture();
  const dashboard = await readDashboard(root, assessmentFile);
  assert.equal(dashboard.recommendation, null);
});

test('valida evaluación y no acepta changes desconocidos', async () => {
  const { root, assessmentFile } = await fixture();
  await assert.rejects(updateAssessment(root, assessmentFile, 'missing-change', { priority: 'high', urgency: 'high', importance: 'high', effort: 'small', blocked: false, note: '' }), /no encontrado/);
  await assert.rejects(updateAssessment(root, assessmentFile, 'urgent-fix', { priority: 'urgente', urgency: 'high', importance: 'high', effort: 'small', blocked: false, note: '' }), /Prioridad inválida/);
  await updateAssessment(root, assessmentFile, 'urgent-fix', { priority: 'high', urgency: 'high', importance: 'high', effort: 'small', blocked: false, note: '  Nota guardada  ' });
  const saved = JSON.parse(await readFile(assessmentFile, 'utf8'));
  assert.equal(saved.assessments['urgent-fix'].note, 'Nota guardada');
});

test('la API devuelve el tablero y persiste sólo payloads válidos', async (t) => {
  const { root, assessmentFile } = await fixture();
  const server = createMonitorServer({ repoRoot: root, assessmentFile });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const overview = await fetch(`${base}/api/dashboard`);
  assert.equal(overview.status, 200); assert.equal((await overview.json()).summary.active, 2);
  const saved = await fetch(`${base}/api/changes/urgent-fix/assessment`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ priority: 'high', urgency: 'high', importance: 'high', effort: 'medium', blocked: false, note: '' }) });
  assert.equal(saved.status, 200);
  const invalid = await fetch(`${base}/api/changes/urgent-fix/assessment`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ priority: 'wrong', urgency: 'high', importance: 'high', effort: 'medium', blocked: false, note: '' }) });
  assert.equal(invalid.status, 422);
});

test('instala el tablero en otro repositorio OpenSpec sin requerir package.json', async () => {
  const target = await mkdtemp(path.join(tmpdir(), 'openspec-install-'));
  await mkdir(path.join(target, 'openspec', 'changes'), { recursive: true });
  await installDashboard(target, { sourceRoot: path.resolve('.') });
  await access(path.join(target, 'tools', 'feature-monitor', 'server.mjs'));
  await access(path.join(target, 'tools', 'feature-monitor', 'public', 'index.html'));
  assert.match(await readFile(path.join(target, 'ABRIR_TABLERO_OPENSPEC.bat'), 'utf8'), /node tools\\feature-monitor\\server\.mjs/);
});
