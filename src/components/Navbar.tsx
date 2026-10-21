'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { contact } from '@/data/projects';
import './music.css';
export function Navbar() {
 const pathname=usePathname();
 return <header className="music-nav portfolio-nav"><Link href="/" className="music-logo" aria-label="Melody, home">melody<span>®</span></Link><nav aria-label="Main navigation"><Link href="/#work">Work</Link><Link href="/about" aria-current={pathname==='/about'?'page':undefined}>About me</Link>{contact.resume ? <a href={contact.resume} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14}/></a> : <span className="resume-unavailable" aria-disabled="true">Resume <small>Coming soon</small></span>}</nav><ThemeToggle/></header>;
}
