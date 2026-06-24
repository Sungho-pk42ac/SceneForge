import { v4 as uuid } from 'uuid';
import type { MaterialEntity, SceneDocument, SceneNode } from './types';
import { SCENE_SCHEMA_VERSION } from './types';

const v = (x:number,y:number,z:number)=>({x,y,z});
export function createMaterial(name:string, preset:MaterialEntity['preset'], color:string): MaterialEntity { return { id: uuid(), name, preset, baseColor: color, opacity: preset==='glass'?0.42:1, metalness: preset==='standard'?0.15:0, roughness: preset==='glass'?0.08:0.55, emissive: preset==='glow'?color:'#000000' }; }
export function createNode(partial: Partial<SceneNode> & Pick<SceneNode,'name'|'kind'>): SceneNode { return { id: partial.id ?? uuid(), parentId: partial.parentId ?? null, name: partial.name, kind: partial.kind, primitive: partial.primitive, assetId: partial.assetId, materialId: partial.materialId, visible: partial.visible ?? true, locked: partial.locked ?? false, castShadow: partial.castShadow ?? true, receiveShadow: partial.receiveShadow ?? true, position: partial.position ?? v(0,0,0), rotation: partial.rotation ?? v(0,0,0), scale: partial.scale ?? v(1,1,1), geometry: partial.geometry ?? {width:1,height:1,depth:1,radius:.5}, light: partial.light, camera: partial.camera }; }
export function createDemoScene(name='SceneForge Demo'): SceneDocument {
 const matA=createMaterial('Reused cobalt glass','glass','#4fa7ff'); const matB=createMaterial('Hover amber glow','glow','#ffb84d'); const matC=createMaterial('Toon slate','toon','#8d9db7');
 const cube=createNode({name:'Hero Cube',kind:'primitive',primitive:'cube',materialId:matA.id,position:v(-1.4,.6,0),rotation:v(.15,.3,0),scale:v(1.1,1.1,1.1)});
 const sphere=createNode({name:'CC0 Asset: Crystal Orb',kind:'model',assetId:'cc0-crystal-orb',materialId:matB.id,position:v(1.2,.65,-.25),scale:v(.9,.9,.9)});
 const plane=createNode({name:'Studio Floor',kind:'primitive',primitive:'plane',materialId:matC.id,position:v(0,0,0),rotation:v(-Math.PI/2,0,0),scale:v(5,5,1),receiveShadow:true,castShadow:false});
 const light=createNode({name:'Key Directional Light',kind:'light',position:v(2,4,3),light:{type:'directional',color:'#ffffff',intensity:2.2}});
 const cam=createNode({name:'Main Camera',kind:'camera',position:v(4,3,6),camera:{fov:48}});
 const hoverState={id:uuid(),nodeId:cube.id,name:'Hover Lift',transform:{position:v(-1.4,1.15,0),scale:v(1.28,1.28,1.28)},materialColor:'#ffb84d',opacity:.86,visibility:true};
 const anim={id:uuid(),name:'Click Spin Rise',duration:1600,delay:0,easing:'easeInOut' as const,loop:false,tracks:[{id:uuid(),nodeId:cube.id,property:'rotation' as const,keyframes:[{id:uuid(),time:0,value:v(.15,.3,0)},{id:uuid(),time:1600,value:v(.15,6.58,0)}]},{id:uuid(),nodeId:cube.id,property:'position' as const,keyframes:[{id:uuid(),time:0,value:v(-1.4,.6,0)},{id:uuid(),time:800,value:v(-1.4,1.4,0)},{id:uuid(),time:1600,value:v(-1.4,.6,0)}]}]};
 const interHover={id:uuid(),nodeId:cube.id,event:'Hover' as const,actions:[{id:uuid(),type:'Change State' as const,targetId:cube.id,stateId:hoverState.id,duration:260,easing:'easeOut' as const}]};
 const interLeave={id:uuid(),nodeId:cube.id,event:'Mouse Leave' as const,actions:[{id:uuid(),type:'Change State' as const,targetId:cube.id,duration:260,easing:'easeOut' as const}]};
 const interClick={id:uuid(),nodeId:cube.id,event:'Click' as const,actions:[{id:uuid(),type:'Play Animation' as const,targetId:cube.id,animationId:anim.id,duration:0,easing:'linear' as const}]};
 return { schemaVersion:SCENE_SCHEMA_VERSION, version:1, id:uuid(), name, nodes:{[cube.id]:cube,[sphere.id]:sphere,[plane.id]:plane,[light.id]:light,[cam.id]:cam}, materials:{[matA.id]:matA,[matB.id]:matB,[matC.id]:matC}, states:{[hoverState.id]:hoverState}, animations:{[anim.id]:anim}, interactions:{[interHover.id]:interHover,[interLeave.id]:interLeave,[interClick.id]:interClick}, cameras:[cam.id], settings:{activeCameraId:cam.id,background:'#080b12',snapping:false} };
}
export function migrateScene(input: unknown): SceneDocument { if(!input || typeof input!=='object') throw new Error('Invalid scene JSON'); const doc=input as SceneDocument; if(typeof doc.schemaVersion!=='number') throw new Error('Missing schemaVersion'); if(doc.schemaVersion>SCENE_SCHEMA_VERSION) throw new Error('Unsupported future schema'); return {...doc, schemaVersion: SCENE_SCHEMA_VERSION}; }
