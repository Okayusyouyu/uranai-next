// Supabase 記事取得（サーバー側fetch・ISR）。anonキーは公開前提・RLSで保護。
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function mapRow(r) {
  return {
    id: r.slug, slug: r.slug, cat: r.category, title: r.title,
    desc: r.description || '', body: r.body, tags: r.tags || [],
    author: r.author || '運命の八門 編集部',
    date: (r.published_at || r.created_at || '').slice(0, 10),
    thumb: r.thumb_url || '',
  };
}

export async function getArticles() {
  if (!URL || !KEY) return [];
  const res = await fetch(
    `${URL}/rest/v1/articles?select=*&status=eq.published&order=created_at.desc`,
    { headers: { apikey: KEY }, next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return (await res.json()).map(mapRow);
}

export async function getArticle(slug) {
  if (!URL || !KEY) return null;
  const res = await fetch(
    `${URL}/rest/v1/articles?select=*&status=eq.published&slug=eq.${encodeURIComponent(slug)}&limit=1`,
    { headers: { apikey: KEY }, next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const a = await res.json();
  return a.length ? mapRow(a[0]) : null;
}

// サムネURL：保存済みthumbがあればそれ、無ければ動的OG(/api/og)
export function thumbFor(a) {
  if (a.thumb) return a.thumb;
  return `/api/og?title=${encodeURIComponent(a.title)}&cat=${encodeURIComponent(a.cat)}`;
}
