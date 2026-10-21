import Link from 'next/link';
import { contact } from '@/data/projects';
export function Footer() { return <footer id="contact" className="music-footer"><span>© {new Date().getFullYear()} MELODY TAI</span><nav className="footer-links"><Link href="/#work">Selected work</Link>{contact.email && <a href={`mailto:${contact.email}`}>Email</a>}{contact.linkedin && <a href={contact.linkedin}>LinkedIn</a>}{contact.resume && <a href={contact.resume}>Resume</a>}</nav><a href="#top">Back to the top ↑</a></footer>; }

export function SignatureFooter() { return <footer className="music-footer"><span>© {new Date().getFullYear()} MELODY TAI</span><span>CODE WITH INTENTION. BEST EXPLORED ON REPEAT.</span><div className="footer-utilities"><a href="#top">Back to the top ↑</a></div></footer>; }
