import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

// 必要な文字だけサブセット取得（CJKフォントを軽量に）。
// 重要: UAを偽装しない。undici既定UAだとGoogleが format('truetype')=TTF を返す
// （MSIE偽装だとEOTになり satori がパースできず500になる）。
async function loadFont(text) {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const m = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype)'\)/);
  if (!m) throw new Error('font url not found');
  const res = await fetch(m[1]);
  if (res.status !== 200) throw new Error('font fetch failed: ' + res.status);
  return await res.arrayBuffer();
}

// カテゴリ→背景画像（public/og/*.jpg・gen-thumbsのマッピングを踏襲）
const BG = {
  '恋愛': 'renai.jpg', '金運': 'kinun.jpg', '相性': 'aishou.jpg', '人間関係': 'aishou.jpg',
  '開運方位': 'houi.jpg', '奇門遁甲': 'kimon.jpg', '今日の運勢': 'kimon.jpg', '占いニュース': 'aishou.jpg',
  '診断': 'kimon.jpg', '方位': 'houi.jpg', '図鑑': 'kimon.jpg', '相性診断': 'aishou.jpg',
};

async function loadBg(cat, reqUrl) {
  const file = BG[cat] || 'kimon.jpg';
  try {
    const buf = await (await fetch(new URL(`/og/${file}`, reqUrl))).arrayBuffer();
    return `data:image/jpeg;base64,${Buffer.from(buf).toString('base64')}`;
  } catch (e) { return null; }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') || '運命の八門').slice(0, 60);
  const cat = (searchParams.get('cat') || '占い').slice(0, 12);
  const text = title + cat + '運命の八門・2026 ✦ #';

  let fontData = null, bgUri = null;
  try { [fontData, bgUri] = await Promise.all([loadFont(text), loadBg(cat, req.url)]); }
  catch (e) { try { bgUri = await loadBg(cat, req.url); } catch (_) {} }

  return new ImageResponse(
    (
      <div style={{ width: '1200px', height: '630px', display: 'flex', position: 'relative', fontFamily: 'JP', background: '#171320' }}>
        {bgUri && <img src={bgUri} width={1200} height={630} style={{ position: 'absolute', top: 0, left: 0, width: '1200px', height: '630px', objectFit: 'cover' }} />}
        {/* 左を濃くするスクリム（文字を読みやすく） */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '1200px', height: '630px', background: 'linear-gradient(90deg, rgba(18,14,28,0.88) 0%, rgba(18,14,28,0.74) 48%, rgba(18,14,28,0.42) 100%)' }} />
        {/* 下を暗くして透かし/フッターを馴染ませる */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '1200px', height: '630px', background: 'linear-gradient(0deg, rgba(18,14,28,0.75) 0%, rgba(18,14,28,0) 28%)' }} />
        {/* 金枠 */}
        <div style={{ position: 'absolute', top: '24px', left: '24px', width: '1128px', height: '578px', border: '4px solid rgba(200,161,74,0.85)', borderRadius: '24px' }} />
        {/* 本文 */}
        <div style={{ position: 'absolute', top: '0px', left: '0px', display: 'flex', flexDirection: 'column', padding: '72px 84px', width: '780px' }}>
          <div style={{ color: '#e7c977', fontSize: 30, letterSpacing: 6 }}>運 命 の 八 門 ・ 2026</div>
          <div style={{ display: 'flex', alignSelf: 'flex-start', marginTop: 24, padding: '8px 22px', background: 'rgba(231,201,119,0.16)', border: '2px solid #c8a14a', borderRadius: 26, color: '#f0dca0', fontSize: 30, fontWeight: 700 }}>{cat}</div>
          <div style={{ color: '#fffaf0', fontSize: 58, fontWeight: 700, lineHeight: 1.34, marginTop: 28, width: '612px' }}>{title}</div>
        </div>
        <div style={{ position: 'absolute', bottom: '52px', left: '84px', color: '#cdbf94', fontSize: 28 }}>#運命の八門</div>
      </div>
    ),
    {
      width: 1200, height: 630,
      fonts: fontData ? [{ name: 'JP', data: fontData, weight: 700, style: 'normal' }] : [],
    }
  );
}
