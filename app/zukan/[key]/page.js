import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GATES, ORDER, affinityGates } from '../../../lib/hachimon';

export const dynamicParams = false;

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://uranai-next.vercel.app';

export function generateStaticParams() {
  return ORDER.map((key) => ({ key }));
}

export async function generateMetadata({ params }) {
  const { key } = await params;
  const g = GATES[key];
  if (!g) return { title: '八門図鑑' };
  const title = `${g.name}（${g.arche}）の性格・2026年の運勢・相性`;
  const desc = `${g.name}（${g.yomi}・五行=${g.elem}）の性格、強みと影、2026年の総合運・金運・恋愛運・仕事運、相性の良い門を奇門遁甲で解説。${g.catch}。`;
  return {
    title,
    description: desc,
    alternates: { canonical: `/zukan/${key}` },
    openGraph: { title: `${title} | 運命の八門`, type: 'article', images: ['/api/og?title=' + encodeURIComponent(g.name + '（' + g.arche + '）') + '&cat=' + encodeURIComponent('図鑑')] },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function GatePage({ params }) {
  const { key } = await params;
  const g = GATES[key];
  if (!g) notFound();
  const aff = affinityGates(key);

  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: '八門図鑑', item: `${SITE}/zukan` },
      { '@type': 'ListItem', position: 3, name: g.name, item: `${SITE}/zukan/${key}` },
    ],
  };

  return (
    <div className="wrap">
      <nav className="small" style={{ margin: '6px 0' }}>
        <Link href="/">ホーム</Link> › <Link href="/zukan">八門図鑑</Link> › {g.name}
      </nav>

      <div className="card">
        <div className="gate-head">
          <h1 className="gate-name" style={{ margin: '.1em 0' }}>{g.name}</h1>
          <div className="gate-arche">{g.arche}</div>
          <div className="gate-catch">― {g.catch} ―</div>
        </div>
        <div className="row">
          <div className="chip">読み <b>{g.yomi}</b></div>
          <div className="chip">五行 <b>{g.elem}</b></div>
        </div>
        <p>{g.honshitsu}</p>
        <p className="small">影：{g.kage}　／　使命：{g.shimei}</p>
        <div className="sec"><h3>⭐ 2026 総合運 <span className="star">{g.sougo[0]}</span></h3><p>{g.sougo[1]}</p></div>
        <div className="sec money"><h3>💰 金運</h3><p>{g.kinun}</p></div>
        <div className="sec"><h3>💕 恋愛運 <span className="star">{g.renai[0]}</span></h3><p>{g.renai[1]}</p></div>
        <div className="sec"><h3>💼 仕事運 <span className="star">{g.shigoto[0]}</span></h3><p>{g.shigoto[1]}</p></div>
        <div className="sec"><h3>🍀 健康・対人</h3><p>{g.kenko}</p></div>
        <div className="sec"><h3>🤝 相性の門</h3>
          <p>相性◎（あなたを生かす）＝<b>{aff.great.join('・') || '―'}</b><br />試練（鍛えられる）＝<b>{aff.hard.join('・') || '―'}</b></p>
          <Link className="small" href="/aisho">→ あの人との相性を観る</Link>
        </div>
        <Link className="cta" href="/shindan">🔮 自分が{g.name}か、無料の八門診断で確かめる</Link>
      </div>

      {/* 他の門へ */}
      <div className="card">
        <h3 className="sect-h">ほかの門を見る</h3>
        <div className="zukan-grid">
          {ORDER.filter((k) => k !== key).map((k) => {
            const o = GATES[k];
            return (
              <Link className="gate-cell" href={`/zukan/${k}`} key={k}>
                <div className="gn">{o.name}</div>
                <div className="ga">{o.arche}</div>
                <div className="ge">{o.elem}・{o.yomi}</div>
              </Link>
            );
          })}
        </div>
      </div>

      <p className="foot">運命の八門 ― 2026 ／ ※娯楽目的<br /><Link href="/about">運営者情報・免責</Link></p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </div>
  );
}
