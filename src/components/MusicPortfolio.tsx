'use client';
import { useEffect, useRef, useState, type MouseEvent, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { soundtracks } from '@/data/soundtrack';
import './music.css';
import './collection.css';
import { useProjectMusic } from './ProjectMusic';
import { ExperienceSection } from './ExperienceSection';
import { SignatureFooter } from './Footer';
const melodyProject = { ...projects[0], slug: 'melody', name: 'Melody', category: 'About me', description: 'A little about me.', role: 'Product designer & researcher', thumbnail: null };
const collectionProjects = [...projects, melodyProject];
const colors = ['#d8dde2', '#d1d4d7', '#b6bbc0', '#e0e2e4'];
const libraryCaptions: Record<string, string> = { mapsocial: 'Campus connections', 'instagram-redesign': 'A more personal feed', ringsense: 'Touchscreen accessibility' };
const hasHover = () => window.matchMedia('(hover: hover)').matches;
function PreviewDetails({ project, roleOnly = false }: { project: Project | typeof melodyProject; roleOnly?: boolean }) {
 if (project.slug === 'melody') return null;
 if (project.slug === 'ringsense') return <p className="project-status">Concept in progress</p>;
 return <div className="preview-details">{!roleOnly && project.thumbnail && <Image src={project.thumbnail} alt={`${project.name} preview`} width={160} height={100} className="preview-thumbnail"/>}<dl><div><dt>Role</dt><dd>{project.role}</dd></div>{!roleOnly && <><div><dt>Timeline</dt><dd>{project.timeline}</dd></div><div className="preview-outcome"><dt>Outcome</dt><dd>{project.outcome}</dd></div></>}</dl></div>;
}
function Player({ selected, playing, onToggle }: { selected: number; playing: boolean; onToggle: () => void }) {
 return <div className={`realistic-player ${playing ? 'playing' : 'paused'}`}>
 <Image src="/images/player-smooth-plate.png" alt="" width={1536} height={1024} priority unoptimized className="player-render" />
 <div className="empty-platter"/>
 <div className="rotating-disc-plane"><div className={`whole-disc ${playing ? 'playing' : ''}`}><Image src={`/images/discs/${collectionProjects[selected].slug}.svg`} alt="" width={512} height={512} className="turntable-disc-image" unoptimized/></div></div>
 <span className="tonearm-rest"/>
 <Image src="/images/player-orange-disc-rim.png" alt="" width={1536} height={1024} priority unoptimized className="player-tonearm" />
 <span className="player-spindle"/>
 <button className="disc-play-control" aria-label={playing ? 'Pause record' : 'Play record'} title={playing ? 'Click to pause' : 'Click to play'} type="button" onClick={event=>{event.stopPropagation();onToggle()}}/>
 <button className="tonearm-control" aria-label={playing ? 'Lift needle and pause music' : 'Drop needle and play music'} aria-pressed={playing} onClick={onToggle}/>
 {!playing && <button className="needle-prompt" type="button" onClick={event => { event.stopPropagation(); onToggle(); }} aria-label="Drop the needle to play music"><span className="needle-cue-icon"><Play size={12} fill="currentColor" aria-hidden="true"/></span><span>Drop the needle</span></button>}
 </div>;
}
export function MusicPortfolio(){
 const router=useRouter();
 const { playProject, activeProjectSlug, isPlaying: playing, playbackError, toggleMusic, nextTrack, previousTrack } = useProjectMusic();
 const [selected,setSelected]=useState(0);
 useEffect(()=>{const index=collectionProjects.findIndex(project=>project.slug===activeProjectSlug);if(index!==-1)setSelected(index)},[activeProjectSlug]);
 const [expanded,setExpanded]=useState<number|null>(null);
 const [departing,setDeparting]=useState(false);
 const rowRefs=useRef<(HTMLAnchorElement|null)[]>([]);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const opening=useRef(false);
 useEffect(()=>()=>{if(timer.current) clearTimeout(timer.current)},[]);
 const select=(index:number)=>{if(opening.current)return;setSelected((index+collectionProjects.length)%collectionProjects.length)};
 const open=(event:MouseEvent<HTMLAnchorElement>,index:number)=>{
  if(event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
  event.preventDefault();
  if(opening.current)return;
  opening.current=true;setSelected(index);
  const url=index===projects.length ? '/about' : `/work/${projects[index].slug}`;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){router.push(url);return}
  setDeparting(true);
  timer.current=setTimeout(()=>router.push(url),600);
 };
 const rowClick=(event:MouseEvent<HTMLAnchorElement>,index:number)=>{
  const ordinary=event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey;
  if(ordinary){event.preventDefault();if(!opening.current){select(index);if(!hasHover())setExpanded(index);playProject(collectionProjects[index].slug)}return}
  open(event,index);
 };
 const rowKey=(event:KeyboardEvent<HTMLAnchorElement>,index:number)=>{
  if(!['ArrowLeft','ArrowRight','ArrowDown','ArrowUp'].includes(event.key))return;
  event.preventDefault();
  const count=projects.length+1;
  const next=(index+(event.key==='ArrowDown'||event.key==='ArrowRight'?1:-1)+count)%count;
  rowRefs.current[next]?.focus();
 };
 const project=collectionProjects[selected];
 return <div className={`music-site ${departing?'is-opening-project':''}`}>
 <main id="main"><section className="listening-room" aria-labelledby="music-title"><div className="music-intro"><div><h1 id="music-title"><span className="hero-greeting">Hi, I’m</span><span className="hero-name">Melody<span className="hero-name-period">.</span></span><span className="hero-statement">A product designer who designs with people in mind.</span></h1></div></div>
 <div className="music-stage" id="collection"><div className="player-area"><div className="turntable-link"><Player selected={selected} playing={playing} onToggle={()=>toggleMusic(project.slug)}/></div><div className="player-controls"><div><button aria-label="Previous track" onClick={previousTrack}><SkipBack size={16}/></button><button aria-label={playing?'Pause music':'Play music'} aria-pressed={playing} onClick={()=>toggleMusic(project.slug)}>{playing?<Pause size={17}/>:<Play size={17}/>}</button><button aria-label="Next track" onClick={nextTrack}><SkipForward size={16}/></button></div></div></div>
 <div className="record-crate"><div className="crate-title"><div><span className="crate-eyebrow">THE COLLECTION</span><h2>Disc library<span>.</span></h2></div><span className="crate-volume">01—0{projects.length+1}</span></div><p className="pick-note">Choose a disc for the turntable.</p>{playbackError && <p className="soundtrack-error" role="status">{playbackError}</p>}<div className="disc-library"><div className="disc-grid">{projects.map((p,i)=><div key={p.slug} className={`project-disc ${selected===i?'is-selected':''} ${expanded===i?'is-expanded':''}`} style={{'--disc-color':colors[i]} as React.CSSProperties}><a ref={el=>{rowRefs.current[i]=el}} href={`/work/${p.slug}`} className="disc-row-link" onKeyDown={e=>rowKey(e,i)} onClick={e=>rowClick(e,i)} aria-current={selected===i?'true':undefined} aria-label={`${p.name}, ${p.category}, ${p.slug==='ringsense' ? 'Concept in progress' : soundtracks.some(track=>track.projectSlug===p.slug) ? 'load disc and play soundtrack' : 'load disc'}`}><span className="compact-disc"><span className="disc-label"><span>SIDE 0{i+1}</span><strong>{p.name}</strong><i/><small>MELODY TAI • SELECTED WORK</small></span></span><span className="disc-caption"><strong>{p.name}</strong><span className="collection-category">{libraryCaptions[p.slug]}</span></span><ArrowUpRight className="collection-arrow" size={17} aria-hidden="true"/></a><div className="touch-project-preview"><PreviewDetails project={p}/><a className="collection-case-link" href={`/work/${p.slug}`} onClick={e=>open(e,i)}>{p.slug==='ringsense' ? 'Concept in progress' : 'View case study'} <ArrowUpRight size={15}/></a></div></div>)}<div className={`project-disc about-disc ${selected===projects.length ? 'is-selected' : ''}`} style={{'--disc-color':colors[3]} as React.CSSProperties}><Link ref={el=>{rowRefs.current[projects.length]=el}} href="/about" className="disc-row-link" onKeyDown={e=>rowKey(e,projects.length)} aria-label="Melody, load disc and play soundtrack" onClick={e=>rowClick(e,projects.length)} aria-current={selected===projects.length ? 'true' : undefined}><span className="compact-disc"><span className="disc-label"><span>SIDE 04</span><strong>Melody</strong><i/><small>MELODY TAI</small></span></span><span className="disc-caption"><strong>Melody</strong><span className="collection-category">A little about me</span></span><ArrowUpRight className="collection-arrow" size={17} aria-hidden="true"/></Link></div></div></div></div></div>
 <div className="now-playing" aria-live="polite" aria-atomic="true"><div className="track-status"><span className={playing?'equalizer active':'equalizer'}><i/><i/><i/><i/></span><span>ON THE PLAYER<small>TRACK 0{selected+1} / 0{projects.length+1}</small></span></div><div className="track-title"><h2>{project.name}</h2>{project.slug!=='melody' && <span>{project.category}</span>}<p className="player-description">{project.description}</p></div><PreviewDetails project={project} roleOnly/><a href={project.slug==='melody' ? '/about' : `/work/${project.slug}`} onClick={e=>open(e,selected)} className="case-link">{project.slug==='melody' ? 'About me' : project.slug==='ringsense' ? 'Concept in progress' : 'Explore project'} <ArrowUpRight size={19}/></a></div>
 </section><section className="plain-projects" id="work" aria-labelledby="selected-work-title"><h2 id="selected-work-title">Selected work</h2><div className="plain-project-grid">{projects.map((p,i)=><article key={p.slug} className={i===0?'featured-project':'project-in-progress'}><Link href={`/work/${p.slug}`} className="album-sleeve" aria-label={p.slug==='ringsense'?'RingSense, case study coming soon':`View ${p.name} case study`}>
 <span className="album-record" aria-hidden="true"><span>{String(i+1).padStart(2,'0')}</span></span>
 <span className={`album-cover${p.slug==='ringsense'?' album-cover--ringsense':''}`}>
 <Image src={i===0?'/images/mapsocial/iphone-14-pro-max-showcase.png':p.slug==='instagram-redesign'?'/images/instagram/iphone-15-pro-showcase.png':'/images/ringsense/showcase.webp'} alt={i===0?'MapSocial event discovery and campus map interface designs':p.slug==='instagram-redesign'?'Instagram redesign on an iPhone 15 Pro against sculpted silver surfaces':'RingSense titanium ring concept with a mint sensor light'} width={i===0?6000:1200} height={i===0?4500:1200} sizes="(max-width:767px) 76vw, 40vw"/>
 <span className="album-cover-label"><span>SIDE {String(i+1).padStart(2,'0')}</span><strong>{p.name}</strong><ArrowUpRight size={18}/></span>
 </span>
 </Link><div className="project-card-copy"><span className="project-card-category">{p.category}</span><h3><Link href={`/work/${p.slug}`}>{p.name}</Link></h3><p className="project-card-description">{p.description}</p>{i===0?<><dl className="project-card-facts"><div><dt>Role</dt><dd>{p.role}</dd></div><div><dt>Duration</dt><dd>{p.timeline}</dd></div><div><dt>Feedback</dt><dd>Reported NPS of 43</dd></div></dl><Link href={`/work/${p.slug}`} className="text-link">Read case study <ArrowUpRight size={16}/></Link></>:p.slug==='instagram-redesign'?<><p className="instagram-card-outcome">{p.timeline} · {p.outcome}</p><Link href={`/work/${p.slug}`} className="text-link">Read case study <ArrowUpRight size={16}/></Link></>:<Link href={`/work/${p.slug}`} className="project-status">Concept in progress <ArrowUpRight size={14}/></Link>}</div></article>)}</div></section><ExperienceSection/><section className="music-outro" id="about" aria-labelledby="outro-title"><span className="outro-disc" aria-hidden="true"><i/></span><div className="outro-copy"><span className="eyebrow">SIDE 04 · MELODY</span><h2 id="outro-title">Behind the work<span className="heading-period">.</span></h2></div><Link href="/about">Meet Melody <ArrowUpRight size={18}/></Link></section></main><SignatureFooter/></div>
}
