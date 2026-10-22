import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
 return { rules: { userAgent: '*', allow: '/', disallow: '/style-tile' }, sitemap: 'https://melodytai.com/sitemap.xml' };
}
