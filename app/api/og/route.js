import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

// 必要な文字だけサブセット取得（CJKフォントを軽量に）。MSIE UAでTTFを返させる。
async function loadFont(text) {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0)' } })).text();
  const m = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype)'\)/) || css.match(/url\(([^)]+)\)/);
  if (!m) throw new Error('font url not found');
  return await (await fetch(m[1])).arrayBuffer();
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') || '運命の八門').slice(0, 60);
  const cat = (searchParams.get('cat') || '占い').slice(0, 12);
  const text = title + cat + '運命の八門 2026 ✦ #' ;
  let fontData;
  try { fontData = await loadFont(text); } catch (e) { fontData = null; }

  return new ImageResponse(
    (
      <div style={{ width: '1200px', height: '630px', display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(135deg,#fffdf8,#f3ead7)', padding: '56px 72px',
        border: '6px solid #c8a14a', borderRadius: '28px', fontFamily: 'JP', position: 'relative' }}>
        <div style={{ color: '#b8932f', fontSize: 30, letterSpacing: 6 }}>運 命 の 八 門 ・ 2026</div>
        <div style={{ display: 'flex', alignSelf: 'flex-start', marginTop: 26, padding: '8px 22px',
          background: '#fff7e2', border: '2px solid #c8a14a', borderRadius: 26, color: '#b8932f', fontSize: 30, fontWeight: 700 }}>{cat}</div>
        <div style={{ display: 'flex', color: '#33304a', fontSize: 58, fontWeight: 700, lineHeight: 1.35, marginTop: 30, maxWidth: 800 }}>{title}</div>
        <div style={{ display: 'flex', position: 'absolute', bottom: 54, left: 72, color: '#9b8f6a', fontSize: 28 }}>#運命の八門</div>
      </div>
    ),
    {
      width: 1200, height: 630,
      fonts: fontData ? [{ name: 'JP', data: fontData, weight: 700, style: 'normal' }] : [],
    }
  );
}
