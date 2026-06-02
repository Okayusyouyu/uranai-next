import Link from 'next/link';
import { getArticle, getArticles, thumbFor } from '../../../lib/supabase';

export const revalidate = 3600; // ISR：n8nの新記事を1時間で反映

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://uranai-next.vercel.app';
const absThumb = (a) => (a.thumb ? a.thumb : `${SITE}/api/og?title=${encodeURIComponent(a.title)}&cat=${encodeURIComponent(a.cat)}`);

export async function generateStaticParams() {
  const arts = await getArticles();
  return arts.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return { title: '記事が見つかりません' };
  const og = thumbFor(a);
  return {
    title: a.title,
    description: a.desc,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { title: a.title, description: a.desc, type: 'article', images: [og] },
    twitter: { card: 'summary_large_image', title: a.title, description: a.desc, images: [og] },
  };
}

// 記事本文の内部リンク（静的サイトの xxx.html）を Next ルートに変換
function rewriteLinks(html) {
  return html
    .replace(/href="article\.html\?id=([a-z0-9-]+)"/g, 'href="/blog/$1"')
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="(shindan|today|aisho|zukan|hikaku|blog|about)\.html"/g, 'href="/$1"');
}

function extractFaq(body) {
  const strip = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const re = /<strong>\s*Q[.．\s]*([\s\S]*?)<\/strong>\s*<br>\s*A[.．\s]*([\s\S]*?)<\/p>/g;
  const out = []; let m;
  while ((m = re.exec(body))) {
    const q = strip(m[1]), a = strip(m[2]);
    if (q && a) out.push({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } });
  }
  return out.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: out } : null;
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return <div className="wrap"><p className="small">記事が見つかりませんでした。</p></div>;

  const arts = await getArticles();
  // 関連＝同カテゴリ優先で3本（足りなければ他カテゴリで補完）
  const others = arts.filter((x) => x.id !== a.id);
  const rel = [...others.filter((x) => x.cat === a.cat), ...others.filter((x) => x.cat !== a.cat)].slice(0, 3);
  const faqLd = extractFaq(a.body);
  const articleLd = {
    '@context': 'https://schema.org', '@type': 'Article', headline: a.title,
    description: a.desc, image: [absThumb(a)], datePublished: a.date, dateModified: a.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${a.slug}` },
    author: { '@type': 'Organization', name: a.author },
    publisher: { '@type': 'Organization', name: '運命の八門', url: SITE },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: '開運コラム', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: a.title, item: `${SITE}/blog/${a.slug}` },
    ],
  };

  return (
    <div className="wrap">
      <nav className="small" style={{ margin: '6px 0' }}>
        <Link href="/">ホーム</Link> › <Link href="/blog">開運コラム</Link> › {a.cat}
      </nav>
      <article className="card">
        <div className="qn">{a.cat}</div>
        <h1 style={{ fontSize: '1.5rem', textAlign: 'left', color: 'var(--txt)', letterSpacing: '.02em', lineHeight: 1.5 }}>{a.title}</h1>
        <p className="small">公開 {a.date} ／ {a.author}</p>
        <img className="cardimg" src={thumbFor(a)} alt={a.title} />
        <div className="article-body" dangerouslySetInnerHTML={{ __html: rewriteLinks(a.body) }} />
        <Link className="cta" href="/hikaku">🔮 あなたの悩みをプロの占い師に相談する（電話占い比較）</Link>
        <div className="row" style={{ marginTop: 10 }}>
          {a.tags.map((t) => <span key={t} className="chip">#{t}</span>)}
        </div>
      </article>

      <div className="card">
        <h3 style={{ color: 'var(--gold)', letterSpacing: '.06em' }}>関連コラム</h3>
        {rel.map((r) => (
          <Link key={r.id} className="small" style={{ display: 'block', padding: '8px 0', borderTop: '1px solid var(--line)' }} href={`/blog/${r.slug}`}>{r.title}</Link>
        ))}
      </div>
      <div className="card" style={{ textAlign: 'center' }}>
        <p className="small">あなたの門・開運方位・金運を今すぐ占う。</p>
        <Link className="btn ghost sm" href="/shindan">▶ 八門診断</Link>
        <Link className="btn ghost sm" href="/today" style={{ marginTop: 8 }}>🧭 今日の方角</Link>
      </div>
      <p className="foot">運命の八門 ― 2026<br />※本記事は占い・エンタテインメントを目的とした情報です。<Link href="/about">運営者情報・免責</Link></p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
    </div>
  );
}
