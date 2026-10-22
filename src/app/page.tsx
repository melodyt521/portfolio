import type { Metadata } from 'next';
import { MusicPortfolio } from '@/components/MusicPortfolio';
export const metadata: Metadata = {
 alternates: { canonical: '/' },
 openGraph: {
  type: 'website', url: '/', siteName: 'Melody Tai',
  title: 'Melody Tai | Product Designer',
  description: 'A product designer who designs with people in mind. Explore my work in product design, user experience, and accessibility.',
 },
 twitter: {
  card: 'summary', title: 'Melody Tai | Product Designer',
  description: 'A product designer who designs with people in mind. Explore my work in product design, user experience, and accessibility.',
 },
};
export default function Home() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Melody Tai', url: 'https://melodytai.com/' }) }}/><MusicPortfolio /></>; }
