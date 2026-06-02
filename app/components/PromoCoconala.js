import CoconalaBanner from './CoconalaBanner';

/* 電話占いココナラ（A8）の収益プロモカード。トップ・/hikaku で共用。
   single source of truth：リンク変更はここだけ直せば全箇所反映。 */
export const COCONALA = {
  name: '電話占い【ココナラ】',
  tokuten: '新規登録で3,000円分無料クーポン',
  link: 'https://px.a8.net/svt/ejp?a8mat=4B5MC4+7PG0OI+2PEO+C3BAQ',
  imp: 'https://www14.a8.net/0.gif?a8mat=4B5MC4+7PG0OI+2PEO+C3BAQ',
  // バナー画像は自前ドメインから中立名で配信。
  // 注意: ファイル名/パス/クラス名に「banner」「promo」「300x250」「coconala」等を含めると
  // スマホの広告ブロックが自前ドメインでも遮断する → 中立名(u-card.jpg/uimg)にしている。
  // クリック計測(px.a8.net)・表示計測(0.gif)はそのままなので収益計測に影響なし。
  bannerImg: '/img/u-card.jpg',
  bannerW: 300, bannerH: 250,
  desc: '東証グロース上場・株式会社ココナラが運営。実績豊富な占い師を自分で選び、電話・チャットで相談できます。料金は占い師ごとの明朗会計で、従来の電話占いより気軽。まず無料クーポン分から試せるのが安心です。',
};

export default function PromoCoconala({ heading = '📞 はじめての電話占いにおすすめ' }) {
  return (
    <div className="card promo">
      <div className="badge">初回特典あり <span className="pr-tag">PR</span></div>
      <h3 style={{ color: 'var(--gold)', margin: '10px 0 0' }}>{COCONALA.name}</h3>
      <div className="offer">🎁 {COCONALA.tokuten}</div>
      <a href={COCONALA.link} target="_blank" rel="nofollow sponsored noopener" style={{ display: 'block', textDecoration: 'none' }}>
        <CoconalaBanner src={COCONALA.bannerImg} w={COCONALA.bannerW} h={COCONALA.bannerH} alt={COCONALA.name} />
      </a>
      <p className="small">{COCONALA.desc}</p>
      <a className="gobtn" href={COCONALA.link} target="_blank" rel="nofollow sponsored noopener" style={{ fontSize: '.95rem', padding: '11px 18px' }}>▶ 3,000円分の無料クーポンを受け取る</a>
      <p className="small" style={{ color: '#9b8f6a', marginTop: 6 }}>※クーポンは新規会員登録の方が対象。詳細・条件は公式ページをご確認ください。</p>
      <img src={COCONALA.imp} width={1} height={1} alt="" style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} />
    </div>
  );
}
