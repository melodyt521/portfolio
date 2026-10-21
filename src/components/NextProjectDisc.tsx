import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import './next-project-disc.css';

export function NextProjectDisc({ href, title, side, label, direction = 'next' }: { href: string; title: string; side: string; label: string; direction?: 'previous' | 'next' }) {
 return <Link className="next-project ms-next-project" href={href}>
  <span className="ms-next-cd" aria-hidden="true"><span>SIDE {side}</span><i/><small>{label}</small></span>
  <span className="ms-next-copy"><span className="eyebrow">{direction === 'previous' ? 'PREVIOUS DISC' : 'NEXT DISC'}</span><strong>{direction === 'previous' && <ArrowLeft/>}{title}{direction === 'next' && <ArrowUpRight/>}</strong></span>
 </Link>;
}

export function CaseStudyNavigation({ currentSlug }: { currentSlug: string }) {
 const current = projects.findIndex(project => project.slug === currentSlug);
 if (current < 0) return null;
 return <nav className="case-disc-navigation" aria-label="Browse case studies">
  {(['previous', 'next'] as const).map(direction => {
   const index = (current + (direction === 'previous' ? -1 : 1) + projects.length) % projects.length;
   const project = projects[index];
   return <NextProjectDisc key={direction} href={`/work/${project.slug}`} title={project.name} side={String(index + 1).padStart(2, '0')} label={project.slug === 'instagram-redesign' ? 'INSTAGRAM' : project.name.toUpperCase()} direction={direction}/>;
  })}
 </nav>;
}
