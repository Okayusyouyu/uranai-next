import Link from 'next/link';
import PromoCoconala from '../components/PromoCoconala';

/* 電話占いサービスの比較（提携済の実データ）。新規提携は go(=/go/<key>) と特典等を追記。
   クリックは /go リダイレクト経由（広告ブロック対策・[[nextjs-seo-affiliate-gotchas]]）。 */
const SERVICES = [
  { rank: 1, name: '電話占いデスティニー', form: '電話・チャット', tokuten: '無料登録で最大2,450円分のお試し鑑定', feat: '厳選占い師が多数在籍／よく当たると評判', go: '/go/destiny' },
  { rank: 2, name: '電話占い【ココナラ】', form: '電話・チャット', tokuten: '新規登録で3,000円分無料クーポン', feat: '東証グロース上場・株式会社ココナラ運営', go: '/go/coconala' },
];

const NAYAMI = [
  ['💕 恋愛・復縁', '霊感霊視・タロットが得意なサービスを。気持ちや相手の状況を読むのが強み'],
  ['💰 金運・仕事', '四柱推命・九星気学に強いサービスを。時期や方位の判断に向く'],
  ['🌙 人生・運勢', '総合鑑定ができるベテラン在籍のサービスを'],
];

export const metadata = {
  title: '電話占い 比較ランキング ― 料金・初回特典・占術で選ぶ',
  description: '当たると評判の電話占いを、料金（1分あたり）・初回無料特典・占術・営業時間・安全性で比較。恋愛・復縁・金運など悩み別の選び方も。',
  alternates: { canonical: '/hikaku' },
  openGraph: { title: '電話占い 比較ランキング', images: ['/api/og?title=' + encodeURIComponent('電話占い 比較ランキング') + '&cat=' + encodeURIComponent('相性')] },
};

export default function Page() {
  return (
    <div className="wrap">
      <h1>電話占い 比較ランキング</h1>
      <div className="sub">料金・初回特典・占術で選ぶ</div>

      <div className="card">
        <p className="small">「占いで自分の門と方位は分かったけれど、<b>具体的な悩みはプロに相談したい</b>」——そんな方へ。<b>初回無料特典</b>のある電話占いなら、気軽に試せます。まずは無料分でお気に入りの占い師を探すのがおすすめです。</p>
      </div>

      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>初回特典で選ぶ おすすめ電話占い</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="cmp">
            <thead>
              <tr><th>#</th><th>サービス</th><th>初回特典</th><th>形式</th><th></th></tr>
            </thead>
            <tbody>
              {SERVICES.map(s => (
                <tr key={s.rank}>
                  <td>{s.rank}</td>
                  <td><b>{s.name}</b><br /><span className="small">{s.feat}</span></td>
                  <td style={{ color: '#c0392b', fontWeight: 700 }}>{s.tokuten}</td>
                  <td>{s.form}</td>
                  <td><a className="gobtn" href={s.go} target="_blank" rel="nofollow sponsored noopener">公式</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">※特典内容・料金・条件は変更される場合があります。最新情報は各公式サイトをご確認ください。</p>
      </div>

      {/* イチオシ枠：ココナラ電話占い（共有コンポーネント） */}
      <PromoCoconala />

      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>悩み別おすすめ</h3>
        {NAYAMI.map((n, i) => (
          <div key={i} className="line" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 2px', borderTop: '1px solid var(--line)' }}>
            <span>{n[0]}</span><span className="small" style={{ textAlign: 'right' }}>{n[1]}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>電話占いの選び方</h3>
        <ul className="small">
          <li><b>料金</b>：1分180〜350円が相場。初回特典の有無で実質負担が大きく変わります</li>
          <li><b>占術</b>：恋愛・復縁は霊感霊視／タロット、運勢・人生は四柱推命／九星気学が得意</li>
          <li><b>安全性</b>：SSL・プライバシーマーク・運営会社の明記を確認</li>
          <li><b>口コミ</b>：的中だけでなく「話しやすさ」「急かされないか」も大切</li>
          <li><b>使い方</b>：先に聞きたいことをメモ。初回無料枠で相性を見てから本鑑定へ</li>
        </ul>
        <Link className="btn ghost sm" href="/shindan">▶ まず自分の門と相性を診断する</Link>
      </div>

      <p className="foot">
        運命の八門 ― 2026<br />
        ※当サイトはアフィリエイトプログラムを利用し、広告収益を得る場合があります。掲載情報は娯楽目的であり、正確性・最新性を保証するものではありません。&nbsp;
        <Link href="/about">運営者情報・免責</Link>
      </p>
    </div>
  );
}
