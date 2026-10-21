'use client';

import { useEffect, useState } from 'react';

export function CaseStudyDuration({ projectLength }: { projectLength: string }) {
  const [minutes, setMinutes] = useState<number | null>(null);

  useEffect(() => {
    const content = document.querySelector<HTMLElement>('.ms-reading-content');
    const words = content?.innerText.trim().split(/\s+/).filter(Boolean).length ?? 0;
    setMinutes(Math.max(1, Math.ceil(words / 200)));
  }, []);

  return <dl className="case-study-duration">
    <div><dt>Read time</dt><dd>{minutes === null ? 'Estimating…' : `About ${minutes} min`}</dd></div>
    <div><dt>Project length</dt><dd>{projectLength}</dd></div>
  </dl>;
}
