'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
export function ThemeToggle() {
 const [dark, setDark] = useState(false);
 useEffect(() => {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const sync = () => {
   let saved: string | null = null;
   try { saved = localStorage.getItem('melody-theme'); } catch {}
   const value = saved ? saved === 'dark' : media.matches;
   document.documentElement.dataset.theme = value ? 'dark' : 'light';
   setDark(value);
  };
  sync(); media.addEventListener('change', sync);
  return () => media.removeEventListener('change', sync);
 }, []);
 return <button className="theme-toggle" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => {
  const next = !dark; setDark(next);
  document.documentElement.dataset.theme = next ? 'dark' : 'light';
  try { localStorage.setItem('melody-theme', next ? 'dark' : 'light'); } catch {}
 }}>{dark ? <Sun size={16} strokeWidth={1.5}/> : <Moon size={16} strokeWidth={1.5}/>}</button>;
}
