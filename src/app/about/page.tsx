import Link from 'next/link';
import { AboutDiscCarousel } from '@/components/AboutDiscCarousel';
import { ArrowLeft } from 'lucide-react';
import { AboutPreview } from '@/components/AboutPreview';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SignatureFooter } from '@/components/Footer';
export const metadata = { title: 'About' };
export default function About() { return <><main id="main" className="about-page"><div className="section-shell"><Link href="/#work" className="text-link"><ArrowLeft size={16}/> BACK TO SELECTED WORK</Link><h1>Hey, I’m Melody.</h1></div><AboutDiscCarousel/><AboutPreview/><ExperienceSection about/></main><SignatureFooter/></>; }
