import Link from 'next/link';
import { ORDER, GATES, affinityGates } from '../../lib/hachimon';

export const metadata = {
  title: '八門図鑑 ― 8つの門の性格・運勢・相性',
  description: '開門・生門・休門・景門・杜門・傷門・驚門・死門――奇門遁甲の八門それぞれの性格、2026年の総合運/金運/恋愛運/仕事運、相性の門を完全網羅。あなたの門は診断で。',
  alternates: { canonical: '/zukan' },
  openGraph: { title: '八門図鑑 ― 8つの門のすべて', images: ['/api/og?title=' + encodeURIComponent('八門図鑑') + '&cat=' + encodeURIComponent('図鑑')] },
};

// 全8門を常時表示（SEO最大化）。グリッドはアンカーでジャンプ＝JS不要
export default function Page() {
  return (
    <div className="wrap">
      <h1>八門図鑑</h1>
      <div className="sub">8つの門それぞれの性格と運命</div>

      <div className="card">
        <div className="zukan-grid">
          {ORDER.map(k => {
            const g = GATES[k];
            return (
              <a className="gate-cell" href={`#gate-${k}`} key={k}>
                <div className="gn">{g.name}</div>
                <div className="ga">{g.arche}</div>
                <div className="ge">{g.elem}・{g.yomi}</div>
              </a>
            );
          })}
        </div>
      </div>

      {ORDER.map(k => {
        const g = GATES[k];
        const aff = affinityGates(k);
        return (
          <div className="card" id={`gate-${k}`} key={k} style={{ scrollMarginTop: 80 }}>
            <div className="gate-head">
              <div className="gate-name">{g.name}</div>
              <div className="gate-arche">{g.arche}</div>
              <div className="gate-catch">― {g.catch} ―</div>
            </div>
            <p>{g.honshitsu}</p>
            <p className="small">影：{g.kage}　／　使命：{g.shimei}</p>
            <div className="sec"><h3>⭐ 2026 総合運 <span className="star">{g.sougo[0]}</span></h3><p>{g.sougo[1]}</p></div>
            <div className="sec money"><h3>💰 金運</h3><p>{g.kinun}</p></div>
            <div className="sec"><h3>💕 恋愛運 <span className="star">{g.renai[0]}</span></h3><p>{g.renai[1]}</p></div>
            <div className="sec"><h3>💼 仕事運 <span className="star">{g.shigoto[0]}</span></h3><p>{g.shigoto[1]}</p></div>
            <div className="sec"><h3>🍀 健康・対人</h3><p>{g.kenko}</p></div>
            <div className="sec"><h3>🤝 相性の門</h3><p>相性◎＝<b>{aff.great.join('・')}</b> ／ 試練＝<b>{aff.hard.join('・')}</b></p></div>
          </div>
        );
      })}

      <div className="card" style={{ textAlign: 'center' }}>
        <p className="small">あなたがどの門かは診断で分かります。</p>
        <Link className="btn ghost sm" href="/shindan">▶ 自分の門を診断する</Link>
      </div>
      <p className="foot">運命の八門 ― 2026 ／ ※娯楽目的</p>
    </div>
  );
}
