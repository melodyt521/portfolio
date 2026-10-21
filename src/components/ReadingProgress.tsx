'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import './reading-progress.css';

export function ReadingProgress() {
 const pathname = usePathname();
 return <ReadingProgressLine key={pathname}/>;
}

function ReadingProgressLine() {
 const [progress, setProgress] = useState(0);
 useEffect(() => {
  let frame = 0;
  const update = () => {
   frame = 0;
   const distance = document.documentElement.scrollHeight - window.innerHeight;
   setProgress(distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 1);
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const observer = new ResizeObserver(schedule);
  observer.observe(document.documentElement);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  schedule();
  return () => {
   cancelAnimationFrame(frame);
   observer.disconnect();
   window.removeEventListener('scroll', schedule);
   window.removeEventListener('resize', schedule);
  };
 }, []);
 return <div className="reading-progress" role="progressbar" aria-label="Case study reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><span style={{ transform: `scaleX(${progress})` }}/></div>;
}
