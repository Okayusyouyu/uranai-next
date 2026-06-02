'use client';
/* トップの「今日の方角」ティーザー。
   生年月日がlocalStorageにあれば今日の方位を即表示（リピーターのDAUフック）。
   無ければCTAだけ表示。SSRはinfo=nullから始まるのでハイドレーション不整合なし。 */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { hsFromBirth, todayInfo, loadBirth } from '../../lib/hachimon';

export default function TodayTeaser() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const b = loadBirth();
    if (b) {
      const hs = hsFromBirth(b);
      if (hs) setInfo({ hs, t: todayInfo(hs, new Date()) });
    }
  }, []);

  return (
    <div className="today" style={{ marginBottom: 18 }}>
      <div className="date">🧭 今日の方角</div>
      {info ? (
        <>
          <div className="line"><span className="k">本命星 {info.hs.name} のあなた</span><span className="v" style={{ fontSize: '.95rem' }}>{info.t.date.getMonth() + 1}/{info.t.date.getDate()}</span></div>
          <div className="line"><span className="k">🌟 今日の開運方位</span><span className="v">{info.t.kichi}</span></div>
          <div className="line"><span className="k">💰 今日の金運方位</span><span className="v">{info.t.kinun}</span></div>
          <Link className="btn ghost sm" href="/today" style={{ marginTop: 12 }}>▶ 今日の運勢をくわしく見る</Link>
        </>
      ) : (
        <>
          <p className="small" style={{ textAlign: 'center', margin: '10px 0' }}>生まれ持った本命星から、<b>今日のあなたの開運方位・金運方位</b>がわかります。毎日チェックして運の波に乗りましょう。</p>
          <Link className="btn ghost sm" href="/today">▶ 今日の運勢・方角を見る（無料）</Link>
        </>
      )}
    </div>
  );
}
