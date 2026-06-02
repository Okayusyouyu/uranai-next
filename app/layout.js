import './globals.css';
import Link from 'next/link';

const SITE = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata = {
  metadataBase: SITE ? new URL(SITE) : new URL('http://localhost:3000'),
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
    </html>
  );
}
