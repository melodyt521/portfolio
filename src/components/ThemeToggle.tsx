'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
export function ThemeToggle() {
 const [dark, setDark] = useState(true);
 useEffect(() => {
  setDark(document.documentElement.dataset.theme !== 'light');
 }, []);
 return <button className="theme-toggle" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => {
  const next = !dark; setDark(next);
  document.documentElement.dataset.theme = next ? 'dark' : 'light';
  try { localStorage.setItem('melody-theme', next ? 'dark' : 'light'); } catch {}
 }}>{dark ? <Sun size={16} strokeWidth={1.5}/> : <Moon size={16} strokeWidth={1.5}/>}</button>;
}
