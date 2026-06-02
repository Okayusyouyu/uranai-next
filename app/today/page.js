import TodayClient from './Client';

export const metadata = {
  title: '今日の方角 ― 毎日の開運・金運の方位',
  description: '生年月日（本命星）から、今日の開運方位・金運方位・避ける方位・ラッキーカラー／アイテムを毎日チェック。奇門遁甲・九星気学ベースの方位占い。',
  alternates: { canonical: '/today' },
  openGraph: { title: '今日の方角 ― 運命の八門', images: ['/api/og?title=' + encodeURIComponent('今日の方角') + '&cat=' + encodeURIComponent('方位')] },
};

export default function Page() {
  return <TodayClient />;
}
