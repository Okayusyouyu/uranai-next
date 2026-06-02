import Link from 'next/link';
import PromoCoconala from '../components/PromoCoconala';

/* ───────────────────────────────────────────────────────────
   電話占いサービスの比較データ。
   A8.netで提携が承認されたら、各社の url にアフィリリンク（広告素材URL）を貼り、
   料金・特典・占術・営業時間・運営/安全 を公式の最新情報に更新する。
   url が空のサービスは「提携準備中」表示になる（公開してOK）。
   ─────────────────────────────────────────────────────────── */
const SERVICES = [
  { rank: 1, name: 'サービスA（提携後に社名）', price: '220円/分〜', tokuten: '初回最大10分無料', senjutsu: '霊感・タロット・四柱推命', time: '24時間', mark: 'SSL/Pマーク', url: '' },
  { rank: 2, name: 'サービスB（提携後に社名）', price: '190円/分〜', tokuten: '初回3,000円分無料', senjutsu: '霊視・占星術', time: '9-26時', mark: 'SSL/Pマーク', url: '' },
  { rank: 3, name: 'サービスC（提携後に社名）', price: '260円/分〜', tokuten: '初回最大8,000円分', senjutsu: 'タロット・九星気学', time: '24時間', mark: 'SSL', url: '' },
  { rank: 4, name: 'サービスD（提携後に社名）', price: '180円/分〜', tokuten: '初回1,500円分', senjutsu: '霊感・波動修正', time: '10-25時', mark: 'SSL/Pマーク', url: '' },
];

const NAYAMI = [
  ['💕 恋愛・復縁', '霊感霊視・タロットが得意なサービスを。気持ちや相手の状況を読むのが強み'],
  ['💰 金運・仕事', '四柱推命・九星気学に強いサービスを。時期や方位の判断に向く'],
  ['🌙 人生・運勢', '総合鑑定ができるベテラン在籍のサービスを'],
];

const anyPending = SERVICES.some(s => !s.url);

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
        <p className="small">「占いで自分の門と方位は分かったけれど、<b>具体的な悩みはプロに相談したい</b>」——そんな方へ。当たると評判の電話占いを、料金・特典・占術で比較しました。初回無料特典のあるサービスなら、気軽に試せます。</p>
        {anyPending && (
          <p className="small" style={{ color: '#b86a6a' }}>⚠️ 現在、提携手続き中のサービスがあります。各社の料金・特典・リンクは、提携完了後に公式の最新情報へ更新します。</p>
        )}
      </div>

      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>総合ランキング</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="cmp">
            <thead>
              <tr><th>#</th><th>サービス</th><th>料金</th><th>初回特典</th><th>占術</th><th>営業</th><th>安全</th><th></th></tr>
            </thead>
            <tbody>
              {SERVICES.map(s => (
                <tr key={s.rank}>
                  <td>{s.rank}</td>
                  <td><b>{s.name}</b></td>
                  <td>{s.price}</td>
                  <td style={{ color: '#c0392b' }}>{s.tokuten}</td>
                  <td>{s.senjutsu}</td>
                  <td>{s.time}</td>
                  <td>{s.mark}</td>
                  <td>
                    {s.url
                      ? <a className="gobtn" href={s.url} target="_blank" rel="nofollow sponsored noopener">公式</a>
                      : <span className="small" style={{ color: '#9b8f6a' }}>準備中</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">※料金は1分あたりの目安。最新情報は各公式サイトをご確認ください。</p>
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
