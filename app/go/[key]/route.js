/* アフィリンクの自前ドメイン経由リダイレクト。
   目的: DOMのhrefに px.a8.net 等の広告ドメインを直書きすると、広告ブロッカーが
   その要素（画像・ボタン）ごと非表示にする。自前ドメイン /go/<key> を踏ませることで
   ブロックを回避しつつ、クリック時にブラウザを広告主URLへ302リダイレクト＝A8の計測は維持。 */

const LINKS = {
  coconala: 'https://px.a8.net/svt/ejp?a8mat=4B5MC4+7PG0OI+2PEO+C3BAQ',
  // もしも：お守りジュエリー Amora Amulet
  amulet: 'https://af.moshimo.com/af/c/click?a_id=5611272&p_id=5551&pc_id=15233&pl_id=71663',
  // A8：電話占いデスティニー（無料登録で最大2,450円分）
  destiny: 'https://px.a8.net/svt/ejp?a8mat=4B5MC7+5JG8FM+1SZG+5ZMCI',
};

export async function GET(req, { params }) {
  const { key } = await params;
  const url = LINKS[key];
  if (!url) return new Response('Not found', { status: 404 });
  return new Response(null, {
    status: 302,
    headers: { Location: url, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}
