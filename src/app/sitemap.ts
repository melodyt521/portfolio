import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';

export default function sitemap(): MetadataRoute.Sitemap {
 return ['', '/about', ...projects.map(project => `/work/${project.slug}`), ...experiences.map(experience => `/work/${experience.slug}`)]
  .map(path => ({ url: `https://melodytai.com${path || '/'}` }));
}
