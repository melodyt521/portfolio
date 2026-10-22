import type { Metadata } from 'next';
import localFont from 'next/font/local';
const sans = localFont({ src: './fonts/geist-latin.woff2', variable: '--font-sans', display: 'swap', weight: '100 900' });
const mono = localFont({ src: './fonts/geist-mono-latin.woff2', variable: '--font-mono', display: 'swap', weight: '100 900' });
import { ProjectMusicProvider } from '@/components/ProjectMusic';
import { Navbar } from '@/components/Navbar';
import './globals.css';
import './page-cursors.css';
import './theme.css';
import '@/components/experience.css';
export const metadata: Metadata = { title: { default: 'Melody Tai - Good Design, On Repeat', template: '%s - Melody Tai' }, description: 'Product designer and UX researcher. Pick a disc and explore selected work by Melody Tai.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html className={`${sans.variable} ${mono.variable}`} lang="en" data-scroll-behavior="smooth" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "try{var theme=localStorage.getItem('melody-theme');if(theme==='light'||theme==='dark')document.documentElement.dataset.theme=theme}catch{}" }}/></head><body><a href="#main" className="skip-link">Skip to content</a><div id="top" /><ProjectMusicProvider><Navbar />{children}</ProjectMusicProvider></body></html>; }
