import Link from 'next/link';
export default function NotFound() { return <main id="main" className="section-shell not-found"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>This track is missing.</h1><p>Explore something from the collection.</p><Link href="/#work" className="text-link">BACK TO SELECTED WORK ↗</Link></main>; }
