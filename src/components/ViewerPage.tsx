"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { createDemoScene } from '@/scene';
import { decodeSnapshot } from '@/publish';
import type { SceneDocument } from '@/types';
const SceneViewport = dynamic(()=>import('./SceneViewport').then(m=>m.SceneViewport),{ssr:false,loading:()=> <div className="bar">Loading public Viewer…</div>});
export function ViewerPage(){ const [doc,setDoc]=useState<SceneDocument|null>(null); const [err,setErr]=useState(''); useEffect(()=>{try{setDoc(location.hash?decodeSnapshot(location.hash):createDemoScene('SceneForge Public Demo'))}catch(e){setErr((e as Error).message); setDoc(createDemoScene('Fallback Demo'))}},[]); return <div className="viewer"><div className="bar"><strong>{doc?.name??'SceneForge Viewer'}</strong><br/><span className={err?'error':'success'}>{err||'Public hash snapshot loaded. Hover and click the cube.'}</span></div>{doc&&<SceneViewport document={doc} playMode={true}/>}</div> }
