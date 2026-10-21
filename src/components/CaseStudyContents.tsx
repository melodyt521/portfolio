'use client';

import { useEffect, useState } from 'react';

const sections = [
  ['ms-overview', 'Overview'],
  ['ms-challenge', 'Challenge'],
  ['ms-research', 'Research'],
  ['ms-reframe', 'Reframe & refocus'],
  ['ms-persona', 'Personas'],
  ['ms-competitive', 'Competitive analysis'],
  ['ms-insights', 'Insights'],
  ['ms-solution', 'Design solution'],
  ['ms-prototype', 'Prototype & testing'],
  ['ms-final', 'Final design'],
  ['ms-design-system', 'Design system'],
  ['ms-metrics', 'Results'],
  ['ms-reflection', 'Takeaways'],
] as const;

export function CaseStudyContents({ items = sections }: { items?: readonly (readonly [string, string])[] }) {
  const [active, setActive] = useState<string>(items[0]?.[0] ?? '');

  useEffect(() => {
    const elements = items.flatMap(([id]) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    const update = () => {
      const current = elements.filter(element => element.getBoundingClientRect().top <= window.innerHeight * .4).at(-1);
      if (current) setActive(current.id);
    };
    const observer = new IntersectionObserver(update, { rootMargin: '-20% 0px -60% 0px' });
    elements.forEach(element => observer.observe(element));
    update();
    return () => observer.disconnect();
  }, [items]);

  return <nav className="ms-contents" aria-label="Case study sections">
    <span className="ms-contents-label">IN THIS CASE STUDY</span>
    {items.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setActive(id)}>{label}</a>)}
  </nav>;
}
