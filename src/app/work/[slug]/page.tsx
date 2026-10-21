import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { experiences } from '@/data/experience';
import { InternshipCaseStudy } from '@/components/InternshipCaseStudy';
import { projects } from '@/data/projects';
import { MapSocialCaseStudy } from '@/components/MapSocialCaseStudy';
import { InstagramCaseStudy } from '@/components/InstagramCaseStudy';
import { Footer } from '@/components/Footer';
import { RingSenseCaseStudy } from '@/components/RingSenseCaseStudy';
export function generateStaticParams() { return [...projects, ...experiences].map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const internship = experiences.find(item => item.slug === slug); if (internship) return { title: `${internship.company} Internship`, description: internship.summary }; const project = projects.find(project => project.slug === slug); return { title: project?.name || 'Project not found', description: project?.description }; }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const internship = experiences.find(item => item.slug === slug); if (internship) return <InternshipCaseStudy experience={internship}/>; const project = projects.find(item => item.slug === slug); if (!project) notFound(); if (slug === 'mapsocial') return <MapSocialCaseStudy />; if (slug === 'instagram-redesign') return <InstagramCaseStudy />; if (slug === 'ringsense') return <RingSenseCaseStudy />; return <><main id="main" className="case-study section-shell page-enter"><Link href="/#work" className="text-link"><ArrowLeft size={16}/> BACK TO SELECTED WORK</Link><header className="case-heading"><span className="eyebrow">{project.category}</span><h1>{project.name}<span className="heading-period">.</span></h1><p>{project.description}</p><p className="coming-soon-message">Case Study coming soon</p></header>{project.thumbnail && <Image src={project.thumbnail} alt="RingSense titanium ring concept with cyan orbital accents" width={1536} height={1024} sizes="(max-width:767px) 90vw, 1200px" style={{display:'block',width:'100%',height:'auto',borderRadius:4,marginBottom:32}}/>}<Link href="/work/mapsocial" className="text-link">Explore MapSocial <ArrowUpRight size={16}/></Link></main><Footer/></>; }
