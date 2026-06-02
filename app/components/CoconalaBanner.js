'use client';
/* A8バナー画像。スマホの広告ブロック/トラッキング防止で pub.a8.net が遮断されると
   画像が空白になるため、読み込み失敗時は自前ドメインのCSSバナーにフォールバックする。 */
import { useState } from 'react';

export default function CoconalaBanner({ src, w, h, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="promo-fallback">
        <div className="pf-title">電話占い【ココナラ】</div>
        <div className="pf-offer">🎁 新規登録で 3,000円分 無料クーポン</div>
        <div className="pf-sub">東証グロース上場・株式会社ココナラ運営</div>
      </div>
    );
  }
  return (
    <img className="bnr" src={src} width={w} height={h} alt={alt}
      loading="lazy" onError={() => setFailed(true)} />
  );
}
