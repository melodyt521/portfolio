import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { currentExperience, experiences } from '@/data/experience';

export function ExperienceSection({ about = false }: { about?: boolean }) {
  return <section className={`experience-section section-shell${about ? ' experience-about' : ''}`} id="experience" aria-labelledby="experience-title">
    <div className="experience-heading"><span className="eyebrow">DESIGN IN PRACTICE</span><h2 id="experience-title">Experience</h2></div>
    <div className="experience-list"><article className="experience-row">
      <div><span className="experience-date">{currentExperience.dates}</span><h3>{currentExperience.company}</h3><p className="experience-role">{currentExperience.role}</p></div>
      <p className="experience-summary">{currentExperience.summary}</p>
    </article>{experiences.map(experience => <Link className="experience-row" href={`/work/${experience.slug}`} key={experience.slug}>
      <div><span className="experience-date">{experience.dates}</span><h3>{experience.company}</h3><p className="experience-role">{experience.role}</p></div>
      <p className="experience-summary">{experience.summary}</p>
      <span className="experience-cta">View experience <ArrowUpRight size={18} aria-hidden="true"/></span>
    </Link>)}</div>
  </section>;
}
