'use client';
import { useState, useEffect } from 'react';
import { hsFromBirth, todayInfo, saveBirth, loadBirth } from '../../lib/hachimon';

export default function TodayClient() {
  const [birth, setBirth] = useState('');     // 入力欄
  const [active, setActive] = useState('');    // 表示中の生年月日
  const [mounted, setMounted] = useState(false);

  // 初回マウント時にlocalStorageから復元（SSRと差が出るのでマウント後に）
  useEffect(() => {
    const saved = loadBirth();
    setMounted(true);
    if (saved) { setActive(saved); setBirth(saved); }
  }, []);

  function show() {
    if (!birth) return;
    saveBirth(birth); setActive(birth);
  }
  function reset() { setActive(''); }

  if (!mounted) {
    return (
      <div className="wrap">
        <h1>今日の方角</h1>
        <div className="sub">毎日の開運・金運の向きをチェック</div>
        <div className="card"><p className="small">読み込み中…</p></div>
      </div>
    );
  }

  if (active) {
    const hs = hsFromBirth(active);
    const t = todayInfo(hs, new Date());
    const wd = ['日', '月', '火', '水', '木', '金', '土'][t.date.getDay()];
    return (
      <div className="wrap">
        <h1>今日の方角</h1>
        <div className="sub">毎日の開運・金運の向きをチェック</div>
        <div className="today">
          <div className="date">{t.date.getFullYear()}年 {t.date.getMonth() + 1}月 {t.date.getDate()}日（{wd}）</div>
          <div className="row" style={{ margin: '6px 0 2px' }}><div className="chip">本命星 <b>{hs.name}</b></div></div>
          <div className="line"><span className="k">🧭 今日の開運方位</span><span className="v">{t.kichi}</span></div>
          <div className="line"><span className="k">💰 今日の金運方位</span><span className="v">{t.kinun}</span></div>
          <div className="line"><span className="k">🚫 避ける方位</span><span className="v" style={{ color: '#b86a6a' }}>{t.avoid}</span></div>
          <div className="line"><span className="k">🎨 ラッキーカラー</span><span className="v" style={{ fontSize: '1.05rem' }}>{t.color}</span></div>
          <div className="line"><span className="k">🎁 ラッキーアイテム</span><span className="v" style={{ fontSize: '1.05rem' }}>{t.item}</span></div>
          <div className="word">💬 {t.word}</div>
        </div>
        <a className="cta" href="/hikaku" style={{ marginTop: 14 }}>🔮 今日の運気をプロに詳しく観てもらう</a>
        <div className="card">
          <p className="small">＜Phase2＞毎朝LINEで「今日の方角」を自動でお届け予定。<br />
            ※方位は九星の<b>日盤</b>で精緻化していきます（現在はMVP版ロジック）。</p>
          <button className="btn ghost sm" onClick={reset}>生年月日を変更</button>
        </div>
        <p className="foot">運命の八門 ― 2026 ／ ※娯楽目的</p>
      </div>
    );
  }

  return (
    <div className="wrap">
      <h1>今日の方角</h1>
      <div className="sub">毎日の開運・金運の向きをチェック</div>
      <div className="card">
        <label className="fld">生年月日を入れると、あなた専用の「今日の方角」が出ます（次回からは自動表示）</label>
        <input type="date" min="1920-01-01" max="2026-12-31" value={birth} onChange={e => setBirth(e.target.value)} />
        <button className="btn sm" style={{ marginTop: 10 }} disabled={!birth} onClick={show}>今日の方角を見る</button>
      </div>
    </div>
  );
}
