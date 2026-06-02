import Link from 'next/link';
import { ORDER, GATES } from '../../lib/hachimon';

export const metadata = {
  title: '八門図鑑 ― 8つの門の性格・運勢・相性一覧',
  description: '開門・生門・休門・景門・杜門・傷門・驚門・死門――奇門遁甲の八門それぞれの性格・2026年の運勢・金運・相性を一覧で。気になる門をタップして詳しく。あなたの門は無料診断で。',
  alternates: { canonical: '/zukan' },
  openGraph: { title: '八門図鑑 ― 8つの門のすべて', images: ['/api/og?title=' + encodeURIComponent('八門図鑑') + '&cat=' + encodeURIComponent('図鑑')] },
  twitter: { card: 'summary_large_image' },
};

export default function Page() {
  return (
    <div className="wrap">
      <h1>八門図鑑</h1>
      <div className="sub">8つの門それぞれの性格と運命</div>

      <div className="card">
        <p className="small">奇門遁甲の<b>八門</b>は、人が生まれ持つ8つの“魂のタイプ”。それぞれに性格・強み・2026年の運勢・金運・相性があります。気になる門をタップすると、詳しい解説ページが開きます。</p>
        <div className="zukan-grid" style={{ marginTop: 12 }}>
          {ORDER.map((k) => {
            const g = GATES[k];
            return (
              <Link className="gate-cell" href={`/zukan/${k}`} key={k}>
                <div className="gn">{g.name}</div>
                <div className="ga">{g.arche}</div>
                <div className="ge">{g.elem}・{g.yomi}</div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 各門の一言紹介（内部リンク＋概要） */}
      <div className="card">
        <h3 className="sect-h">8つの門のひとこと紹介</h3>
        <ul className="small" style={{ lineHeight: 2 }}>
          {ORDER.map((k) => {
            const g = GATES[k];
            return (
              <li key={k}>
                <Link href={`/zukan/${k}`}><b>{g.name}</b>（{g.arche}）</Link>…{g.catch}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <p className="small">あなたがどの門かは診断で分かります。</p>
        <Link className="btn ghost sm" href="/shindan">▶ 自分の門を診断する</Link>
      </div>
      <p className="foot">運命の八門 ― 2026 ／ ※娯楽目的</p>
    </div>
  );
}
