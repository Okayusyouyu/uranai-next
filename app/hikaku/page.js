import Link from 'next/link';

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

/* ココナラ電話占い＝A8提携済み。新規登録で3,000円分無料クーポンの強オファー。
   従来型の分課金電話占い（ヴェルニ等）とは料金体系が違うため、表ではなく専用カードで訴求。 */
const COCONALA = {
  name: '電話占い【ココナラ】',
  tokuten: '新規登録で3,000円分無料クーポン',
  link: 'https://px.a8.net/svt/ejp?a8mat=4B5MC4+7PG0OI+2PEO+C3BAQ',
  imp: 'https://www14.a8.net/0.gif?a8mat=4B5MC4+7PG0OI+2PEO+C3BAQ',
  bannerImg: 'https://pub.a8.net/data/s00000012624/banner/202108031451560480.jpg',
  bannerW: 300, bannerH: 250,
  desc: '東証グロース上場・株式会社ココナラが運営。実績豊富な占い師を自分で選び、電話・チャットで相談できます。料金は占い師ごとの明朗会計で、従来の電話占いより気軽。まず無料クーポン分から試せるのが安心です。',
};

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

      {/* イチオシ枠：ココナラ電話占い（3,000円無料クーポン） */}
      <div className="card" style={{ border: '2px solid var(--gold)' }}>
        <div style={{ display: 'inline-block', background: '#c0392b', color: '#fff', fontSize: '.78rem', fontWeight: 700, borderRadius: 999, padding: '4px 14px' }}>初めての方におすすめ</div>
        <h3 style={{ color: 'var(--gold)', marginTop: 10 }}>📞 {COCONALA.name}</h3>
        <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#c0392b', margin: '2px 0 6px' }}>🎁 {COCONALA.tokuten}</div>
        <a href={COCONALA.link} target="_blank" rel="nofollow sponsored noopener" style={{ display: 'block', textDecoration: 'none' }}>
          {COCONALA.bannerImg
            ? <img src={COCONALA.bannerImg} width={COCONALA.bannerW} height={COCONALA.bannerH} alt={COCONALA.name} style={{ display: 'block', maxWidth: '100%', height: 'auto', margin: '10px auto', borderRadius: 12, border: '1px solid var(--line)' }} />
            : null}
        </a>
        <p className="small">{COCONALA.desc}</p>
        <a className="gobtn" href={COCONALA.link} target="_blank" rel="nofollow sponsored noopener" style={{ fontSize: '.95rem', padding: '10px 18px' }}>▶ 3,000円分の無料クーポンを受け取る</a>
        <p className="small" style={{ color: '#9b8f6a', marginTop: 6 }}>※クーポンは新規会員登録の方が対象。詳細・条件は公式ページをご確認ください。</p>
        {/* A8インプレッション計測タグ */}
        <img src={COCONALA.imp} width={1} height={1} alt="" style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} />
      </div>

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
