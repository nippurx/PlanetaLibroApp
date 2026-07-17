import { homedir } from 'node:os';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { readRegistry } from './registry.mjs';

const PROJECT_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function defaultConfigFile() {
  return process.env.FEATURE_MONITOR_CONFIG || path.join(homedir(), '.feature-monitor', 'projects.json');
}

export function validateProjects(config) {
  if (!config || config.schema_version !== 1 || !Array.isArray(config.projects)) throw new Error('El registro de proyectos no cumple el esquema versión 1');
  const ids = new Set(), roots = new Set();
  for (const project of config.projects) {
    if (!PROJECT_ID.test(project.id)) throw new Error(`ID de proyecto inválido: ${project.id}`);
    if (typeof project.name !== 'string' || !project.name.trim()) throw new Error(`Nombre inválido en ${project.id}`);
    if (!path.isAbsolute(project.root)) throw new Error(`La raíz de ${project.id} debe ser absoluta`);
    const root = path.resolve(project.root).toLocaleLowerCase();
    if (ids.has(project.id)) throw new Error(`ID de proyecto duplicado: ${project.id}`);
    if (roots.has(root)) throw new Error(`Raíz de proyecto duplicada: ${project.root}`);
    if (typeof project.enabled !== 'boolean') throw new Error(`Estado enabled inválido en ${project.id}`);
    ids.add(project.id); roots.add(root);
  }
  return config;
}

export async function readProjects(file = defaultConfigFile()) {
  try { return validateProjects(JSON.parse(await readFile(file, 'utf8'))); }
  catch (error) {
    if (error.code === 'ENOENT') return { schema_version: 1, projects: [] };
    throw error;
  }
}

export async function writeProjects(file, config) {
  validateProjects(config); await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(config, null, 2)}\n`, 'utf8'); await rename(temporary, file);
}

export function projectBacklog(project) { return path.join(path.resolve(project.root), 'docs', 'features-backlog.json'); }

export async function registerProject(file, input) {
  const root = path.resolve(input.root);
  await readRegistry(path.join(root, 'docs', 'features-backlog.json'));
  const project = { id: input.id, name: input.name, root, enabled: true };
  validateProjects({ schema_version: 1, projects: [project] });
  const config = await readProjects(file);
  const sameId = config.projects.find((item) => item.id === project.id);
  if (sameId && path.resolve(sameId.root).toLocaleLowerCase() !== root.toLocaleLowerCase()) throw new Error(`El ID ${project.id} ya pertenece a otra ruta`);
  const sameRoot = config.projects.find((item) => path.resolve(item.root).toLocaleLowerCase() === root.toLocaleLowerCase());
  if (sameRoot && sameRoot.id !== project.id) throw new Error(`La ruta ya está registrada como ${sameRoot.id}`);
  config.projects = config.projects.filter((item) => item.id !== project.id);
  config.projects.push(project); config.projects.sort((a, b) => a.name.localeCompare(b.name));
  await writeProjects(file, config); return project;
}

export async function ensureDefaultProject(file, expected) {
  const config = await readProjects(file), resolvedRoot = path.resolve(expected.root).toLocaleLowerCase();
  const mistaken = config.projects.find((item) => item.id === 'planeta-libro' && path.resolve(item.root).toLocaleLowerCase() === resolvedRoot);
  if (mistaken && expected.id === 'planeta-libro-app') {
    if (config.projects.some((item) => item.id === expected.id && item !== mistaken)) throw new Error(`No se puede migrar: ya existe ${expected.id}`);
    mistaken.id = expected.id; mistaken.name = expected.name; mistaken.root = path.resolve(expected.root);
    await writeProjects(file, config); return mistaken;
  }
  if (config.projects.length === 0) return registerProject(file, expected);
  return config.projects.find((item) => item.id === expected.id) || null;
}

export async function aggregateProjects(config) {
  const features = [], errors = [], projects = config.projects.map(({ id, name, enabled }) => ({ id, name, enabled }));
  await Promise.all(config.projects.filter((project) => project.enabled).map(async (project) => {
    try {
      const registry = await readRegistry(projectBacklog(project));
      const { projectRegistry } = await import('./registry.mjs');
      const projected = await projectRegistry(registry, project.root);
      features.push(...projected.features.map((feature) => ({ ...feature, key: `${project.id}/${feature.id}`, project: { id: project.id, name: project.name } })));
    } catch (error) { errors.push({ project_id: project.id, project_name: project.name, error: error.message }); }
  }));
  return { schema_version: 1, projects, features, errors };
}
