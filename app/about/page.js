export const metadata = { title: '運営者情報・免責・プライバシー' };
export default function Page() {
  return (
    <div className="wrap">
      <h1>運営者情報・免責</h1><div className="sub">about / disclaimer / privacy</div>
      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>免責事項</h3>
        <p className="small">当サイトの占い・診断・運勢・方位の情報は、娯楽を目的としたものです。結果の的中・効果・利益を保証するものではありません。重要な判断はご自身の責任で、必要に応じて専門家にご相談ください。</p>
      </div>
      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>運営者情報（要記入）</h3>
        <p className="small">運営者名・監修・お問い合わせ先を公開前に記入してください（E-E-A-T強化）。</p>
      </div>
      <p className="foot">運命の八門 ― 2026</p>
    </div>
  );
}
