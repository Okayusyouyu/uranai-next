import AishoClient from './Client';

export const metadata = {
  title: '八門 相性診断 ― あの人との相性を五行で観る',
  description: '奇門遁甲の八門と五行（相生・相剋）から、あなたとあの人の相性を診断。恋愛・人間関係の相性を★評価＋解説で。忖度なしの本格相性占い。',
  alternates: { canonical: '/aisho' },
  openGraph: { title: '八門 相性診断', images: ['/api/og?title=' + encodeURIComponent('八門 相性診断') + '&cat=' + encodeURIComponent('相性')] },
};

export default function Page() {
  return <AishoClient />;
}
