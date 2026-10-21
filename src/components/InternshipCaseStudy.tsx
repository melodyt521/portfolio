import { NextProjectDisc } from './NextProjectDisc';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { type Experience } from '@/data/experience';
import assets from '../../docs/internship-assets.json';
import { ImageZoom } from './ImageZoom';
import { Footer } from './Footer';
import './mapsocial.css';

export function InternshipCaseStudy({ experience }: { experience: Experience }) {
  const images = assets.filter(asset => asset.company === experience.folder);
  const cover = images.find(asset => asset.name === 'cover');
  const team = images.find(asset => asset.name === 'team');
  const moments = images.filter(asset => asset.name.startsWith('moment-'));
  function figure(asset: typeof assets[number], alt: string, caption?: string) {
    const src = `/${asset.path.replace(/^public\//, '')}`;
    return <figure className="internship-figure" key={asset.name}><ImageZoom src={src} alt={alt}><Image src={src} alt={alt} width={asset.width} height={asset.height} sizes="(max-width:767px) 90vw, 900px"/></ImageZoom>{caption && <figcaption>{caption}</figcaption>}</figure>;
  }
  return <><main id="main" className="internship-page section-shell">
    <Link href="/#experience" className="text-link"><ArrowLeft size={16}/> BACK TO EXPERIENCE</Link>
    <header className="internship-header"><span className="eyebrow">UI/UX DESIGN INTERNSHIP</span><h1>{experience.company}<span className="heading-period">.</span></h1><p>{experience.summary}</p>
      <dl className="internship-facts"><div><dt>Role</dt><dd>{experience.role}</dd></div><div><dt>Dates</dt><dd>{experience.dates}</dd></div>{experience.folder === 'gamania' && <div><dt>Team</dt><dd>{experience.team}</dd></div>}<div><dt>Tools</dt><dd>{experience.tools}</dd></div></dl>
    </header>
    {experience.folder === 'gamania' ? <figure className="internship-figure internship-logo"><Image src="/images/gamania/current-logo.svg" alt="Gamania current official logo" width={1160} height={320} priority/></figure>  : cover && <figure className="internship-figure crypto-brand-art" aria-label="Crypto-Arsenal brand artwork"><div className="crypto-brand-object"><span className="crypto-brand-depth" aria-hidden="true"><Image src="/images/crypto-arsenal/cover.webp" alt="" width={cover.width} height={cover.height} sizes="(max-width:767px) 85vw, 640px"/></span><ImageZoom src="/images/crypto-arsenal/cover.webp" alt="Crypto-Arsenal brand artwork"><Image src="/images/crypto-arsenal/cover.webp" alt="Crypto-Arsenal brand artwork" width={cover.width} height={cover.height} sizes="(max-width:767px) 85vw, 640px" priority/></ImageZoom></div></figure>}
    <div className="internship-body"><nav className="internship-contents" aria-label="Internship sections"><span className="eyebrow">IN THIS EXPERIENCE</span>{experience.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title === 'My contributions' ? section.heading : section.title}</a>)}</nav>
      <div>{experience.sections.map((section, index) => <section className="internship-section" id={section.id} key={section.id}><span className="eyebrow">{section.title}</span><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{index === 0 && team && figure(team, experience.folder === 'gamania' ? 'Gamania Branding Center team' : 'Crypto-Arsenal remote scrum meeting and Jira board', experience.folder === 'gamania' ? 'The Branding Center team.' : 'A remote scrum meeting with the Crypto-Arsenal team.')}</section>)}
      {moments.length > 0 && <details className="internship-moments"><summary>Internship moments <span>{moments.length} photos</span></summary><div>{moments.map((asset, index) => figure(asset, `Gamania internship photo ${index + 1}`))}</div></details>}
      </div>
    </div>
    <NextProjectDisc href={`/work/${experience.folder === 'gamania' ? 'crypto-arsenal-internship' : 'uiux-design-intern-gamania'}`} title={experience.folder === 'gamania' ? 'Crypto-Arsenal' : 'Gamania'} side={experience.folder === 'gamania' ? '06' : '05'} label={experience.folder === 'gamania' ? 'CRYPTO-ARSENAL' : 'GAMANIA'}/>
  </main><Footer/></>;
}
