import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { readDashboard, updateAssessment } from './execution.mjs';

const toolRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(toolRoot, '..', '..');
const host = process.env.FEATURE_MONITOR_HOST || '127.0.0.1';
const port = Number(process.env.FEATURE_MONITOR_PORT || 4174);
const assets = new Map([['/', ['index.html', 'text/html; charset=utf-8']], ['/app.js', ['app.js', 'text/javascript; charset=utf-8']], ['/styles.css', ['styles.css', 'text/css; charset=utf-8']]]);
const run = promisify(execFile);

function json(response, status, body) { response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }); response.end(JSON.stringify(body)); }
async function bodyFrom(request) { let body = ''; for await (const chunk of request) { body += chunk; if (body.length > 16_384) throw new Error('Solicitud demasiado grande'); } return JSON.parse(body || '{}'); }
function sameOrigin(request) { const origin = request.headers.origin; return !origin || new URL(origin).host === request.headers.host; }

async function localApplyGuidance(root, slug) {
  try {
    const command = `openspec instructions apply --change ${slug} --json`;
    const invocation = process.platform === 'win32'
      ? { file: process.env.ComSpec || 'cmd.exe', args: ['/d', '/s', '/c', command] }
      : { file: 'openspec', args: ['instructions', 'apply', '--change', slug, '--json'] };
    const { stdout } = await run(invocation.file, invocation.args, { cwd: root, timeout: 8_000, maxBuffer: 256_000, windowsHide: true });
    const result = JSON.parse(stdout);
    if (typeof result.instruction !== 'string') throw new Error('Respuesta OpenSpec inválida');
    return { state: typeof result.state === 'string' ? result.state : 'ready', instruction: result.instruction };
  } catch {
    return { state: 'unavailable', instruction: 'No se pudieron obtener las instrucciones locales de OpenSpec para este change.' };
  }
}

export function createMonitorServer(options = {}) {
  const root = options.repoRoot || repoRoot;
  const assessmentFile = options.assessmentFile || path.join(root, 'docs', 'openspec-execution-assessments.json');
  const applyGuidance = options.applyGuidance || ((slug) => localApplyGuidance(root, slug));
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);
      if (request.method === 'GET' && url.pathname === '/api/dashboard') return json(response, 200, await readDashboard(root, assessmentFile));
      const applyMatch = url.pathname.match(/^\/api\/changes\/([a-z0-9]+(?:-[a-z0-9]+)*)\/apply-guidance$/);
      if (request.method === 'GET' && applyMatch) {
        const dashboard = await readDashboard(root, assessmentFile);
        if (!dashboard.changes.some((change) => change.slug === applyMatch[1])) return json(response, 404, { error: 'Change no encontrado' });
        return json(response, 200, await applyGuidance(applyMatch[1]));
      }
      const match = url.pathname.match(/^\/api\/changes\/([a-z0-9]+(?:-[a-z0-9]+)*)\/assessment$/);
      if (request.method === 'PATCH' && match) {
        if (!sameOrigin(request)) return json(response, 403, { error: 'Origen no permitido' });
        return json(response, 200, await updateAssessment(root, assessmentFile, match[1], await bodyFrom(request)));
      }
      if (request.method === 'GET' && assets.has(url.pathname)) { const [filename, type] = assets.get(url.pathname); response.writeHead(200, { 'content-type': type, 'x-content-type-options': 'nosniff' }); return response.end(await readFile(path.join(toolRoot, 'public', filename))); }
      json(response, 404, { error: 'No encontrado' });
    } catch (error) { json(response, error instanceof SyntaxError ? 400 : 422, { error: error.message || 'Error inesperado' }); }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createMonitorServer().listen(port, host, () => console.log(`Tablero OpenSpec: http://${host}:${port}`));
}
