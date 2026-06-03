/* 開運グッズ 物販アフィリエイト枠（もしも/楽天/Amazon）。
   広告ブロック対策：バナー画像は自前ドメイン(/img/*)、クリックは /go/<key> リダイレクト経由。
   BANNERS=画像バナー（300×250等）、PRODUCTS=商品カード（名前/画像/価格）。 */
const BANNERS = [
  {
    img: '/img/g1.png', href: '/go/amulet', w: 300, h: 250,
    alt: '大天使の波動を込めたお守りジュエリー Amora Amulet',
    cap: '大天使の波動を込めた お守りジュエリー「Amora Amulet」',
  },
  {
    img: '/img/g2.png', href: '/go/kuro', w: 300, h: 300,
    alt: '黒瑞堂 黒い天然石アクセサリー専門店',
    cap: '黒瑞堂｜黒い天然石・パワーストーンの専門店',
  },
];
const PRODUCTS = [
  // 例: { name: '天然水晶 ブレスレット', img: '/img/xxx.jpg', price: '¥2,480', url: '/go/xxx', shop: '楽天' },
];

export default function KaiunGoods({ banners = BANNERS, products = PRODUCTS }) {
  const empty = banners.length === 0 && products.length === 0;
  return (
    <div className="card">
      <h3 className="sect-h">🛍 運気を後押しする開運グッズ<span className="pr-tag">PR</span></h3>
      <p className="small" style={{ textAlign: 'center' }}>本命星の吉方位カラーや、心を整えるお守りアイテムを編集部がピックアップ。気になるものはタップで詳細へ。</p>

      {banners.map((b, i) => (
        <a key={i} href={b.href} target="_blank" rel="nofollow sponsored noopener" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
          <img src={b.img} width={b.w} height={b.h} alt={b.alt} loading="lazy"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 12, border: '1px solid var(--line)', margin: '12px auto 6px' }} />
          {b.cap && <div className="small" style={{ color: 'var(--gold)', fontWeight: 700 }}>{b.cap}</div>}
        </a>
      ))}

      {products.length > 0 && (
        <div className="goods-grid" style={{ marginTop: 12 }}>
          {products.map((p, i) => (
            <a key={i} className="goods-card" href={p.url} target="_blank" rel="nofollow sponsored noopener">
              {p.img && <img src={p.img} alt={p.name} loading="lazy" />}
              <div className="nm">{p.name}</div>
              {p.price && <div className="pc">{p.price}</div>}
              {p.shop && <div className="small">{p.shop}で見る</div>}
            </a>
          ))}
        </div>
      )}

      {empty && <p className="small" style={{ textAlign: 'center' }}>編集部が選ぶ開運アイテム（パワーストーン・風水グッズ・お守りなど）を準備中です。</p>}
    </div>
  );
}
