import type { MetadataRoute } from 'next';
import { getAllCourseSlugs } from '@/lib/data/courses';
import { getAllArticleSlugs } from '@/lib/data/articles';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pros-nine.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courseSlugs = getAllCourseSlugs();
  const articleSlugs = await getAllArticleSlugs();

  const staticRoutes = [
    '',
    '/about',
    '/articles',
    '/courses',
    '/contact',
    '/products/aed',
    '/products/aed/a102',
    '/products/aed/a112',
    '/products/auto-cpr',
    '/products/physio',
    '/privacy',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const courseEntries: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date(),
  }));

  const articleEntries: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...courseEntries, ...articleEntries];
}