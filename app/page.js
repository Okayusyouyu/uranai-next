import Link from 'next/link';
import { getArticles, thumbFor } from '../lib/supabase';

export const revalidate = 3600;

const MENU = [
  ['/shindan', '🔮', '八門診断', 'あなたの正体と2026の運勢・金運'],
  ['/today', '🧭', '今日の方角', '毎日の開運・金運方位をチェック'],
  ['/zukan', '📖', '八門図鑑', '8つの門それぞれの性格と運命'],
  ['/aisho', '💞', '相性診断', 'あの人との“門の相性”を観る'],
  ['/blog', '✍', '開運コラム', '奇門遁甲・開運方位・金運の記事'],
  ['/hikaku', '📞', '電話占い比較', '悩みをプロに相談したい人へ'],
];
const GATES = [
  ['開門（開拓者）', '始まりを切り拓く行動の人'],
  ['生門（育成者）', '育てて増やす“財運の門”'],
  ['休門（癒やし手）', '整え和ませる調停者'],
  ['景門（表現者）', '魅せて照らす華と発信力'],
  ['杜門（守護者）', '守り極める職人気質'],
  ['傷門（挑戦者）', '壊して勝ち取る勝負師'],
  ['驚門（変革者）', '揺さぶり変えるトリックスター'],
  ['死門（再生者）', '終わらせ生まれ変わる不死鳥'],
];

export default async function Home() {
  const arts = await getArticles();
  const latest = arts.slice(0, 3);
  return (
    <div className="wrap">
      <div className="hero">
        <div className="sub">奇 門 遁 甲 ・ 2 0 2 6</div>
        <div className="big">運命の八門</div>
        <p className="lead">古代中国の秘術「奇門遁甲」の八つの門が、あなたの“正体”と、運を動かす<b>方位</b>を映し出す。生まれ持った門を知り、毎日の追い風に乗る。</p>
        <Link className="btn" href="/shindan" style={{ maxWidth: 340, margin: '14px auto 0' }}>▶ 8つの質問で“あなたの門”を占う</Link>
        <p className="small" style={{ marginTop: 8 }}>所要1分・無料 ／ 結果はシェア画像つき</p>
      </div>

      <div className="card">
        <h3 style={{ textAlign: 'center', color: 'var(--gold)', letterSpacing: '.1em', margin: '.2em 0 1em' }}>できること</h3>
        <div className="menu-grid">
          {MENU.map(([h, ic, t, d]) => (
            <Link key={h} className="menu-card" href={h}>
              <div className="ic">{ic}</div><div className="t">{t}</div><div className="d">{d}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ textAlign: 'center', color: 'var(--gold)', letterSpacing: '.08em', margin: '.2em 0 1em' }}>最新の開運コラム</h3>
        {latest.length === 0 && <p className="small">コラムを準備中です。</p>}
        {latest.map((a) => (
          <Link key={a.id} className="card" style={{ display: 'block', color: 'var(--txt)', marginBottom: 12 }} href={`/blog/${a.slug}`}>
            <img src={thumbFor(a)} loading="lazy" alt="" style={{ width: '100%', borderRadius: 10, marginBottom: 8, border: '1px solid var(--line)' }} />
            <div className="qn">{a.cat}・{a.date}</div>
            <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '1rem', lineHeight: 1.5 }}>{a.title}</div>
          </Link>
        ))}
        <Link className="btn ghost sm" href="/blog">コラムをもっと見る</Link>
      </div>

      <div className="card">
        <h3 style={{ textAlign: 'center', letterSpacing: '.08em', color: 'var(--gold)' }}>八門とは ― 運命を司る8つの門</h3>
        <p className="small">奇門遁甲（きもんとんこう）は、古代中国の軍師・諸葛孔明も用いたと伝わる<b>「帝王学」</b>。<b>時間（いつ）と空間（どの方位）</b>を読み解き、運を“動かす”ための実践的な占術です。その中核が<b>八門</b>——人は誰しも、生まれながらに一つの門の気を宿していると考えます。</p>
        <p className="small">あなたがどの門の魂を持つかで、<b>強み・恋愛のクセ・金運の流れ・吉となる方位</b>が変わります。</p>
        <ul className="small" style={{ lineHeight: 2 }}>
          {GATES.map(([n, d]) => <li key={n}><b>{n}</b>…{d}</li>)}
        </ul>
        <p className="small">「凶」とされる門も、本サイトでは“なりたい正体”として前向きに読み解きます。あなたの門と2026年の<Link href="/today">開運方位</Link>を、まずは無料の診断で確かめてみましょう。</p>
        <Link className="btn ghost sm" href="/shindan" style={{ marginTop: 10 }}>▶ 自分の門を診断する</Link>
      </div>

      <p className="foot">運命の八門 ― 2026<br />※本サイトは占い・エンタテインメントを目的としたものです。<Link href="/about">運営者情報・免責・プライバシー</Link></p>
    </div>
  );
}
