import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'SceneForge', description: 'Local-first 3D interactive scene editor' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
