import { getArticles } from '../lib/supabase';

export const revalidate = 3600;

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://uranai-next.vercel.app';

export default async function sitemap() {
  const now = new Date();
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/shindan', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/today', priority: 0.9, changeFrequency: 'daily' },
    { path: '/zukan', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/aisho', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/hikaku', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'daily' },
    { path: '/about', priority: 0.3, changeFrequency: 'yearly' },
  ].map(p => ({ url: SITE + p.path, lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority }));

  let articlePages = [];
  try {
    const arts = await getArticles();
    articlePages = arts.map(a => ({
      url: `${SITE}/blog/${a.slug}`,
      lastModified: a.date ? new Date(a.date) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (e) { /* 記事取得失敗時は静的ページのみ */ }

  return [...staticPages, ...articlePages];
}
