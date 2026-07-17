import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultConfigFile, registerProject } from './projects.mjs';

const args = process.argv.slice(2);
const rootArg = args.find((value) => !value.startsWith('--'));
if (!rootArg) {
  console.error('Uso: npm run features:register -- <ruta> [--id=proyecto] [--name="Proyecto"]');
  process.exitCode = 1;
} else {
  const root = path.resolve(rootArg);
  const value = (prefix) => args.find((item) => item.startsWith(prefix))?.slice(prefix.length);
  const fallback = path.basename(root).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  try {
    const project = await registerProject(defaultConfigFile(), { root, id: value('--id=') || fallback, name: value('--name=') || path.basename(root) });
    console.log(`Proyecto registrado: ${project.id} (${project.root})`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
