import LZString from 'lz-string';
import type { SceneDocument } from './types';
import { migrateScene } from './scene';
export function encodeSnapshot(doc:SceneDocument){ const json=JSON.stringify(doc); const packed=LZString.compressToEncodedURIComponent(json); if(packed.length>90000) throw new Error(`Publish snapshot too large: ${packed.length} chars`); return packed; }
export function decodeSnapshot(hash:string): SceneDocument { const clean=hash.replace(/^#/,''); const text=LZString.decompressFromEncodedURIComponent(clean); if(!text) throw new Error('Invalid or empty SceneForge snapshot'); return migrateScene(JSON.parse(text)); }
export function viewerUrl(doc:SceneDocument){ return `/viewer#${encodeSnapshot(doc)}`; }
