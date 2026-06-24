import { openDB } from 'idb';
import type { ProjectRecord, SceneDocument } from './types';
const DB='sceneforge-local-first'; const STORE='projects';
async function db(){ return openDB(DB,1,{upgrade(d){ if(!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE,{keyPath:'id'}); }}); }
export async function saveProject(project:ProjectRecord){ const d=await db(); await d.put(STORE,{...project,updatedAt:Date.now()}); }
export async function listProjects(): Promise<ProjectRecord[]>{ const d=await db(); return (await d.getAll(STORE)).sort((a,b)=>b.updatedAt-a.updatedAt); }
export async function loadProject(id:string): Promise<ProjectRecord|undefined>{ const d=await db(); return d.get(STORE,id); }
export async function deleteProject(id:string){ const d=await db(); await d.delete(STORE,id); }
export async function saveLastProjectId(id:string){ localStorage.setItem('sceneforge:lastProjectId',id); }
export function getLastProjectId(){ return typeof localStorage==='undefined'?null:localStorage.getItem('sceneforge:lastProjectId'); }
export async function persistDocument(document:SceneDocument){ await saveProject({id:document.id,name:document.name,updatedAt:Date.now(),document}); await saveLastProjectId(document.id); }
