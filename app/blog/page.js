import Link from 'next/link';
import { getArticles, thumbFor } from '../../lib/supabase';

export const revalidate = 3600;
export const metadata = {
  title: '開運コラム',
  description: '奇門遁甲・八門・開運方位・金運・恋愛・相性など、運を動かすための開運コラム。毎日更新。',
};

export default async function BlogIndex() {
  const arts = await getArticles();
  return (
    <div className="wrap">
      <h1>開運コラム</h1>
      <div className="sub">奇門遁甲・開運方位・金運・恋愛・相性</div>
      {arts.length === 0 && <p className="small">記事を準備中です。</p>}
      {arts.map((a) => (
        <Link key={a.id} className="card" style={{ display: 'block', color: 'var(--txt)' }} href={`/blog/${a.slug}`}>
          <img src={thumbFor(a)} loading="lazy" alt="" style={{ width: '100%', borderRadius: 10, marginBottom: 8, border: '1px solid var(--line)' }} />
          <div className="qn">{a.cat}・{a.date}</div>
          <div style={{ fontSize: '1.08rem', color: 'var(--gold)', fontWeight: 700, margin: '2px 0 6px' }}>{a.title}</div>
          <div className="small">{a.desc}</div>
        </Link>
      ))}
      <div className="card" style={{ textAlign: 'center' }}>
        <p className="small">まずは自分の門を知ろう。</p>
        <Link className="btn ghost sm" href="/shindan">▶ 八門診断をする</Link>
      </div>
      <p className="foot">運命の八門 ― 2026 ／ ※娯楽目的</p>
    </div>
  );
}
