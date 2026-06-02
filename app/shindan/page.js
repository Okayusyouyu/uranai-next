import ShindanClient from './Client';

export const metadata = {
  title: '八門診断 ― 8つの質問であなたの正体を占う',
  description: '奇門遁甲の八門で、あなたの正体・2026年の総合運/金運/恋愛運/仕事運・開運方位を無料診断。8つの質問と生年月日だけ。結果はシェア用カード画像で。',
  alternates: { canonical: '/shindan' },
  openGraph: { title: '八門診断 ― あなたの正体は？', images: ['/api/og?title=' + encodeURIComponent('八門診断 ― あなたの正体は？') + '&cat=' + encodeURIComponent('診断')] },
};

export default function Page() {
  return <ShindanClient />;
}
