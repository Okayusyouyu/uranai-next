/* 開運グッズ 物販アフィリエイト枠（Amazon/楽天/もしも）。
   PRODUCTS にもしも/楽天の[商品名・画像URL・価格・アフィリリンク]を入れると2列グリッドで表示。
   空のときは構成を示す控えめな準備中表示（ライブでも違和感が出ないように）。 */
const PRODUCTS = [
  // 例: { name: '天然水晶 ブレスレット', img: 'https://...jpg', price: '¥2,480', url: 'https://...', shop: '楽天' },
];

export default function KaiunGoods({ products = PRODUCTS }) {
  return (
    <div className="card">
      <h3 className="sect-h">🛍 金運・恋愛運を上げる開運グッズ<span className="pr-tag">PR</span></h3>
      {products.length === 0 ? (
        <p className="small" style={{ textAlign: 'center' }}>編集部が選ぶ開運アイテム（パワーストーン・風水グッズ・お守りなど）を準備中です。あなたの<b>本命星の吉方位カラー</b>に合うグッズを近日掲載します。</p>
      ) : (
        <div className="goods-grid">
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
    </div>
  );
}
