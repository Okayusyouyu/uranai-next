import Link from 'next/link';
import { getArticles } from '../lib/supabase';
import { GATES, ORDER } from '../lib/hachimon';
import PromoCoconala from './components/PromoCoconala';
import TodayTeaser from './components/TodayTeaser';
import SnsLinks from './components/SnsLinks';
import KaiunGoods from './components/KaiunGoods';
import ColumnRanking from './components/ColumnRanking';

export const revalidate = 600;

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://uranai-next.vercel.app';

export const metadata = {
  alternates: { canonical: '/' },
  openGraph: { title: '運命の八門 ― 奇門遁甲のあなた診断', images: ['/api/og?title=' + encodeURIComponent('運命の八門') + '&cat=' + encodeURIComponent('診断')] },
  twitter: { card: 'summary_large_image' },
};

const siteLd = {
  '@context': 'https://schema.org', '@type': 'WebSite',
  name: '運命の八門', url: SITE,
  description: '奇門遁甲の八門で、あなたの正体・2026年の運勢・開運方位を無料診断。',
  publisher: { '@type': 'Organization', name: '運命の八門 編集部', url: SITE },
};

const MENU = [
  ['/shindan', '🔮', '八門診断', 'あなたの正体と2026の運勢・金運'],
  ['/today', '🧭', '今日の方角', '毎日の開運・金運方位をチェック'],
  ['/zukan', '📖', '八門図鑑', '8つの門それぞれの性格と運命'],
  ['/aisho', '💞', '相性診断', 'あの人との“門の相性”を観る'],
  ['/blog', '✍', '開運コラム', '奇門遁甲・開運方位・金運の記事'],
  ['/hikaku', '📞', '電話占い比較', '悩みをプロに相談したい人へ'],
];
const THEMES = ['恋愛', '復縁', '金運', '相性', '人間関係', '開運方位'];

const POPULAR_CATS = ['恋愛', '復縁', '金運', '相性', '人間関係'];

export default async function Home() {
  const arts = await getArticles();
  const latest = arts.slice(0, 3); // 最新3件（created_at降順）
  // 人気＝最新3件を除き、人気ジャンル優先で3件（最新と重複させない）
  const latestSlugs = new Set(latest.map(a => a.slug));
  const popular = arts
    .filter(a => !latestSlugs.has(a.slug))
    .sort((a, b) => {
      const ra = POPULAR_CATS.indexOf(a.cat), rb = POPULAR_CATS.indexOf(b.cat);
      return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb);
    })
    .slice(0, 3);
  return (
    <div className="wrap">
      {/* HERO */}
      <div className="hero">
        <div className="sub">奇 門 遁 甲 ・ 2 0 2 6</div>
        <div className="big">運命の八門</div>
        <p className="lead">古代中国の秘術「奇門遁甲」の八つの門が、あなたの“正体”と、運を動かす<b>方位</b>を映し出す。生まれ持った門を知り、毎日の追い風に乗る。</p>
        <Link className="btn" href="/shindan" style={{ maxWidth: 340, margin: '14px auto 0' }}>▶ 8つの質問で“あなたの門”を占う</Link>
        <p className="small" style={{ marginTop: 8 }}>所要1分・無料 ／ 結果はシェア画像つき</p>
      </div>

      {/* 今日の方角ティーザー（DAU） */}
      <TodayTeaser />

      {/* 公式SNS */}
      <SnsLinks />

      {/* 電話占い（収益） */}
      <PromoCoconala />

      {/* できること */}
      <div className="card">
        <h3 className="sect-h">できること</h3>
        <div className="menu-grid">
          {MENU.map(([h, ic, t, d]) => (
            <Link key={h} className="menu-card" href={h}>
              <div className="ic">{ic}</div><div className="t">{t}</div><div className="d">{d}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* 季節・特集バナー */}
      <Link className="feature-banner" href="/blog/kaiun-houi-2026" style={{ marginBottom: 18 }}>
        <small>✦ 特 集 ✦</small>
        <b>2026年 あなたの開運方位ガイド</b>
        <span className="go">特集を読む →</span>
      </Link>

      {/* 最新コラム（3件） */}
      <ColumnRanking title="最新コラム" items={latest} />

      {/* 人気の開運コラム（3件） */}
      <ColumnRanking title="人気の開運コラム" items={popular}>
        <div className="theme-chips" style={{ margin: '14px 0 4px' }}>
          {THEMES.map(t => <Link key={t} className="theme-chip" href="/blog">#{t}</Link>)}
        </div>
        <Link className="btn ghost sm" href="/blog" style={{ marginTop: 10 }}>コラムをもっと見る</Link>
      </ColumnRanking>

      {/* 開運グッズ（物販アフィリ） */}
      <KaiunGoods />

      {/* 八門とは + 8タイプちら見せ */}
      <div className="card">
        <h3 className="sect-h">八門とは ― 運命を司る8つの門</h3>
        <p className="small">奇門遁甲（きもんとんこう）は、古代中国の軍師・諸葛孔明も用いたと伝わる<b>「帝王学」</b>。<b>時間（いつ）と空間（どの方位）</b>を読み解き、運を“動かす”ための実践的な占術です。その中核が<b>八門</b>——人は誰しも、生まれながらに一つの門の気を宿していると考えます。</p>
        <p className="small" style={{ textAlign: 'center', color: 'var(--gold)', fontWeight: 700, margin: '14px 0 4px' }}>あなたはどの門？</p>
        <div className="type-grid">
          {ORDER.map(k => {
            const g = GATES[k];
            return (
              <Link key={k} className="type-mini" href={`/zukan/${k}`}>
                <b>{g.name}</b>（{g.arche}）<span>{g.catch}</span>
              </Link>
            );
          })}
        </div>
        <p className="small">「凶」とされる門も、本サイトでは“なりたい正体”として前向きに読み解きます。あなたの門と2026年の<Link href="/today">開運方位</Link>を、まずは無料の診断で確かめてみましょう。</p>
        <Link className="btn ghost sm" href="/shindan" style={{ marginTop: 10 }}>▶ 自分の門を診断する</Link>
      </div>

      <p className="foot">運命の八門 ― 2026<br />※本サイトは占い・エンタテインメントを目的としたものです。<Link href="/about">運営者情報・免責・プライバシー</Link></p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
    </div>
  );
}
