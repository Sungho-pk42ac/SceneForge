export type UUID = string;
export type NodeKind = 'primitive' | 'model' | 'light' | 'camera' | 'group' | 'text';
export type PrimitiveKind = 'cube' | 'sphere' | 'cylinder' | 'plane' | 'text';
export type MaterialPreset = 'standard' | 'glass' | 'toon' | 'glow' | 'gradient' | 'matcap';
export type Easing = 'linear' | 'easeInOut' | 'easeOut' | 'easeIn';
export type EventType = 'Start' | 'Hover' | 'Mouse Leave' | 'Click' | 'Key Down';
export type ActionType = 'Change State' | 'Play Animation' | 'Switch Camera' | 'Open Link';
export type TrackProp = 'position' | 'rotation' | 'scale' | 'color' | 'opacity';
export interface Vec3 { x:number; y:number; z:number }
export interface SceneNode { id:UUID; parentId:UUID|null; name:string; kind:NodeKind; primitive?:PrimitiveKind; assetId?:string; materialId?:UUID; visible:boolean; locked:boolean; castShadow:boolean; receiveShadow:boolean; position:Vec3; rotation:Vec3; scale:Vec3; geometry:{ width?:number; height?:number; depth?:number; radius?:number }; light?:{ color:string; intensity:number; type:'directional'|'point'|'spot' }; camera?:{ fov:number }; }
export interface MaterialEntity { id:UUID; name:string; preset:MaterialPreset; baseColor:string; opacity:number; metalness:number; roughness:number; emissive:string }
export interface ObjectState { id:UUID; nodeId:UUID; name:string; transform?:Partial<Pick<SceneNode,'position'|'rotation'|'scale'>>; materialColor?:string; opacity?:number; visibility?:boolean }
export interface Keyframe { id:UUID; time:number; value:number|Vec3|string }
export interface AnimationTrack { id:UUID; nodeId:UUID; property:TrackProp; keyframes:Keyframe[] }
export interface Animation { id:UUID; name:string; duration:number; delay:number; easing:Easing; loop:boolean; tracks:AnimationTrack[] }
export interface InteractionAction { id:UUID; type:ActionType; targetId?:UUID; stateId?:UUID; animationId?:UUID; cameraId?:UUID; url?:string; duration:number; easing:Easing }
export interface Interaction { id:UUID; nodeId:UUID; event:EventType; key?:string; actions:InteractionAction[] }
export interface SceneDocument { schemaVersion:number; version:number; id:UUID; name:string; nodes:Record<UUID,SceneNode>; materials:Record<UUID,MaterialEntity>; states:Record<UUID,ObjectState>; animations:Record<UUID,Animation>; interactions:Record<UUID,Interaction>; cameras:UUID[]; settings:{ activeCameraId?:UUID; background:string; snapping:boolean } }
export interface ProjectRecord { id:UUID; name:string; updatedAt:number; document:SceneDocument }
export const SCENE_SCHEMA_VERSION = 1;
