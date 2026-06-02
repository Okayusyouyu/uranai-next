// お問い合わせフォームのURL。Googleフォーム作成後にここへ貼るだけで有効化される。
const CONTACT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfzhjGRYGQV45pNuCAbLa-n4Aqt6x9eLTJt-3t6_LQB-I8Ntg/viewform';

export const metadata = {
  title: '運営者情報・免責・プライバシーポリシー',
  description: '「運命の八門」の運営者情報、編集・監修方針、免責事項、広告・アフィリエイトの表記、プライバシーポリシー、お問い合わせ先。',
  alternates: { canonical: '/about' },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '運命の八門 編集部',
  description: '奇門遁甲・九星気学・五行思想をもとに、開運情報・占いコンテンツを制作する編集部。',
  knowsAbout: ['奇門遁甲', '九星気学', '五行思想', '開運方位', '占い'],
};

export default function Page() {
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <h1>運営者情報・免責</h1>
      <div className="sub">about / disclaimer / privacy</div>

      {/* 運営者情報 */}
      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>運営者情報</h3>
        <table className="cmp">
          <tbody>
            <tr><th>サイト名</th><td>運命の八門</td></tr>
            <tr><th>運営者</th><td>運命の八門 編集部</td></tr>
            <tr><th>編集・監修</th><td>奇門遁甲・九星気学・五行思想の古典および各種文献をもとに、運命の八門 編集部が編集・制作しています。</td></tr>
            <tr><th>お問い合わせ</th><td>
              {CONTACT_FORM_URL
                ? <a href={CONTACT_FORM_URL} target="_blank" rel="noopener noreferrer">お問い合わせフォーム</a>
                : <span>お問い合わせフォームを準備中です。</span>}
            </td></tr>
            <tr><th>運営方針</th><td>占術の伝統的な考え方をわかりやすく翻訳し、毎日の前向きな一歩につながる開運情報をお届けします。</td></tr>
          </tbody>
        </table>
      </div>

      {/* 編集方針・専門性（E-E-A-T） */}
      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>編集方針とコンテンツの作り方</h3>
        <p className="small">当サイトの診断・記事・運勢は、思いつきや無作為ではなく、以下の伝統的な占術の体系にもとづいて設計しています。</p>
        <ul className="small">
          <li><b>奇門遁甲（きもんとんこう）</b>：古代中国に源を持つ「方位と時間」の占術。八門（開門・休門・生門・傷門・杜門・景門・死門・驚門）を、誰もが前向きに受け取れる8つのアーキタイプとして再解釈しています。</li>
          <li><b>九星気学（きゅうせいきがく）</b>：生年月日から「本命星」を割り出し、五行（木・火・土・金・水）の性質をもとに、開運方位・金運方位・相性を導きます。本命星の算出は立春（2月4日ごろ）を年の区切りとする伝統的な方式に従っています。</li>
          <li><b>五行思想</b>：相生（育てる関係）・相剋（抑える関係）の理論を用いて、門どうしの相性を機械的・一貫した基準で判定しています（忖度なしに★2〜5の幅が出る設計）。</li>
        </ul>
        <p className="small">診断ロジックは決定的（同じ入力なら同じ結果）で、乱数による「水増し」は行っていません。生年月日や回答内容にもとづき、再現性のある形で結果を表示します。</p>
      </div>

      {/* 免責事項 */}
      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>免責事項</h3>
        <p className="small">当サイトの占い・診断・運勢・方位の情報は、<b>娯楽を目的</b>としたものです。結果の的中・効果・利益を保証するものではありません。</p>
        <p className="small">健康・お金・投資・契約・人間関係・進路など重要な判断は、占いの結果のみに頼らず、<b>必ずご自身の責任において</b>、必要に応じて医師・弁護士・公的機関などの専門家にご相談ください。当サイトの情報は、医療・投資・法律に関する助言を行うものではありません。当サイトの利用により生じたいかなる損害についても、運営者は責任を負いかねます。</p>
      </div>

      {/* 広告・アフィリエイト（ステマ規制・景表法対応） */}
      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>広告・アフィリエイトについて</h3>
        <p className="small">当サイトは、第三者配信の広告サービスおよびアフィリエイトプログラム（電話占い・チャット占いサービス等の紹介）を利用しており、これらの広告を経由してご利用・ご購入があった場合、運営者が紹介料等の収益を得ることがあります。</p>
        <p className="small">紹介する各サービスの掲載・順位・評価は、提携の有無やサービス内容を総合的に考慮して決定していますが、提携の有無が掲載に影響する場合があります。広告であることがわかるように表記するよう努めています（景品表示法・ステルスマーケティング規制に配慮）。最終的なご利用は、各サービスの公式情報をご確認のうえ、ご自身の判断でお願いいたします。</p>
      </div>

      {/* プライバシーポリシー */}
      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>プライバシーポリシー</h3>
        <ul className="small">
          <li><b>取得・利用する情報</b>：診断のために入力された生年月日・回答は、原則としてご利用の端末内（ブラウザ）で処理されます。「今日の方角」を次回から自動表示するため、生年月日をブラウザのローカルストレージに保存する場合があります（サーバーには送信しません）。</li>
          <li><b>アクセス解析</b>：サイト改善のため、Googleアナリティクス等のアクセス解析ツールを利用し、Cookieによって匿名のアクセス情報（閲覧ページ・端末種別等）を収集する場合があります。これらは個人を特定するものではありません。Cookieはブラウザの設定で無効化できます。</li>
          <li><b>広告・アフィリエイトのCookie</b>：提携先サービスが、成果計測のためにCookieを利用する場合があります。</li>
          <li><b>第三者提供</b>：法令にもとづく場合を除き、取得した情報を本人の同意なく第三者へ提供することはありません。</li>
          <li><b>改定</b>：本ポリシーは必要に応じて改定することがあります。重要な変更がある場合は当ページでお知らせします。</li>
        </ul>
      </div>

      {/* お問い合わせ */}
      <div className="card">
        <h3 style={{ color: 'var(--gold)' }}>お問い合わせ</h3>
        {CONTACT_FORM_URL
          ? <p className="small">ご質問・掲載に関するお問い合わせは、<a href={CONTACT_FORM_URL} target="_blank" rel="noopener noreferrer">お問い合わせフォーム</a>よりお寄せください。</p>
          : <p className="small">お問い合わせフォームを準備中です。公開までしばらくお待ちください。</p>}
      </div>

      <p className="foot">運命の八門 ― 2026</p>
    </div>
  );
}
