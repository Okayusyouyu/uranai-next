import './globals.css';
import Link from 'next/link';
import { GoogleAnalytics } from '@next/third-parties/google';

// GA4計測ID。env(NEXT_PUBLIC_GA_ID)優先、無ければ下の値（公開情報なので直書きOK）。
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-EBHDG48S93';

// OGP絶対URLの基点。明示env優先 → Vercel自動提供のプロダクションURL → ローカル。
// VERCEL_PROJECT_PRODUCTION_URL はVercelが自動でセット（手動env不要・独自ドメインにも追従）。
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: '運命の八門 ― 奇門遁甲のあなた診断', template: '%s ― 運命の八門' },
  description: '奇門遁甲の八門で、あなたの正体・2026年の運勢・開運方位を無料診断。恋愛・金運・相性の開運コラムも毎日更新。',
  openGraph: { siteName: '運命の八門', locale: 'ja_JP', type: 'website' },
};

const NAV = [
  ['/shindan', '八門診断'], ['/today', '今日の方角'], ['/zukan', '八門図鑑'],
  ['/aisho', '相性診断'], ['/blog', 'コラム'], ['/hikaku', '電話占い比較'],
];

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <div className="nav"><div className="nav-inner">
          <Link href="/" className="brand">運命の八門</Link>
          {NAV.map(([h, t]) => <Link key={h} href={h}>{t}</Link>)}
        </div></div>
        {children}
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
