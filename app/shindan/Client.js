'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { QUESTIONS, GATES, hsFromBirth, judgeGate, affinityGates, drawCard, saveBirth } from '../../lib/hachimon';

export default function ShindanClient() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [birth, setBirth] = useState('');
  const [result, setResult] = useState(null); // {key,g,hs}
  const canvasRef = useRef(null);
  const [cardUrl, setCardUrl] = useState('');

  const ready = !answers.includes(null) && !!birth;

  function pick(qi, oi) {
    setAnswers(a => { const n = [...a]; n[qi] = oi; return n; });
  }

  function go() {
    if (!ready) return;
    saveBirth(birth);
    const hs = hsFromBirth(birth);
    const key = judgeGate(answers, hs.elem);
    setResult({ key, g: GATES[key], hs });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 結果カードを描画 → 画像化
  useEffect(() => {
    if (result && canvasRef.current) {
      drawCard(canvasRef.current, result.g, result.hs.name, result.hs.houi);
      setCardUrl(canvasRef.current.toDataURL('image/png'));
    }
  }, [result]);

  function again() {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setResult(null); setCardUrl('');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (result) {
    const { key, g, hs } = result;
    const aff = affinityGates(key);
    const shareText = `私の正体は【${g.name}／${g.arche}】！本命星：${hs.name}／開運方位：${hs.houi.kichi.join('・')}／金運方位：${hs.houi.kinun.join('・')}\n#運命の八門診断`;
    return (
      <div className="wrap">
        <div className="card">
          <div className="gate-head"><div className="small">あなたの正体</div>
            <div className="gate-name">{g.name}</div><div className="gate-arche">{g.arche}</div>
            <div className="gate-catch">― {g.catch} ―</div></div>
          <canvas ref={canvasRef} width={1080} height={1080} style={{ display: 'none' }} />
          {cardUrl && <img src={cardUrl} className="cardimg" alt={`${g.name}の結果カード`} />}
          <p>{g.honshitsu}</p>
          <p className="small">影：{g.kage}　／　使命：{g.shimei}</p>
          <div className="row"><div className="chip">本命星 <b>{hs.name}</b>（{hs.elem}）</div><div className="chip">吉方位 <b>{hs.houi.kichi.join('・')}</b></div></div>
          <div className="sec money"><h3>💰 金運【あなたの主役運】</h3><p>{g.kinun}</p>
            <div className="row" style={{ margin: '6px 0 0' }}><div className="chip">金運方位 <b>{hs.houi.kinun.join('・')}</b></div></div></div>
          <div className="sec"><h3>⭐ 2026 総合運 <span className="star">{g.sougo[0]}</span></h3><p>{g.sougo[1]}</p></div>
          <div className="sec"><h3>💕 恋愛運 <span className="star">{g.renai[0]}</span></h3><p>{g.renai[1]}</p></div>
          <div className="sec"><h3>💼 仕事運 <span className="star">{g.shigoto[0]}</span></h3><p>{g.shigoto[1]}</p></div>
          <div className="sec"><h3>🍀 健康・対人</h3><p>{g.kenko}</p></div>
          <div className="sec"><h3>🤝 相性の門</h3>
            <p>相性◎（あなたを生かす）＝<b>{aff.great.join('・')}</b><br />試練（鍛えられる）＝<b>{aff.hard.join('・')}</b></p>
            <Link className="small" href="/aisho">→ あの人との相性を観る</Link></div>
          <a className="cta" href="/hikaku">🔮 {g.name}のあなたへ ― プロに金運・恋愛を詳しく観てもらう</a>
          <Link className="cta" href="/today">🧭 {g.name}の「今日の方角」を見る</Link>
          <ShareRow canvasRef={canvasRef} shareText={shareText} />
          <button className="btn ghost" onClick={again} style={{ marginTop: 10 }}>もう一度診断する</button>
        </div>
        <p className="foot">運命の八門 ― 2026 ／ ※娯楽目的</p>
      </div>
    );
  }

  return (
    <div className="wrap">
      <h1>運命の八門 診断</h1>
      <div className="sub">8つの質問で“あなたの門”を占う</div>
      <div id="quiz">
        {QUESTIONS.map((Q, qi) => (
          <div className="card" key={qi}>
            <div className="qn">Q{qi + 1}</div><p className="q">{Q.q}</p>
            {Q.o.map((o, oi) => (
              <button key={oi} className={'opt' + (answers[qi] === oi ? ' sel' : '')} onClick={() => pick(qi, oi)}>{o[0]}</button>
            ))}
          </div>
        ))}
      </div>
      <div className="card">
        <label className="fld">生年月日（方位・運勢の算出に使用）</label>
        <input type="date" min="1920-01-01" max="2026-12-31" value={birth} onChange={e => setBirth(e.target.value)} />
      </div>
      <button className="btn" disabled={!ready} onClick={go}>運命の門をひらく</button>
    </div>
  );
}

function ShareRow({ canvasRef, shareText }) {
  function saveImg(silent) {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'unmei-hachimon.png', { type: 'image/png' });
      if (!silent && navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file], text: shareText }); return; } catch (e) {}
      }
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'unmei-hachimon.png'; a.click();
      try { await navigator.clipboard.writeText(shareText); } catch (e) {}
      alert(silent ? '結果画像を保存しました！' : '画像を保存しました。Instagram／TikTokアプリで投稿してください（文章もコピー済み）。');
    }, 'image/png');
  }
  function share(p) {
    if (p === 'x') window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText), '_blank');
    else if (p === 'line') window.open('https://line.me/R/msg/text/?' + encodeURIComponent(shareText), '_blank');
    else saveImg(p === 'save');
  }
  return (
    <>
      <div className="small" style={{ textAlign: 'center', marginTop: 8 }}>結果をシェア</div>
      <div className="share-row">
        <button className="sicon line" onClick={() => share('line')} title="LINEでシェア">LINE</button>
        <button className="sicon x" onClick={() => share('x')} title="Xでシェア">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </button>
        <button className="sicon ig" onClick={() => share('ig')} title="Instagram（画像保存して投稿）">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="white" stroke="none" /></svg>
        </button>
        <button className="sicon tt" onClick={() => share('tt')} title="TikTok（画像保存して投稿）">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M16 3c.3 2 1.6 3.6 3.8 3.9v2.7c-1.4 0-2.7-.4-3.8-1.1v6.1c0 3-2.4 5.4-5.4 5.4S5.2 17.6 5.2 14.6 7.6 9.2 10.6 9.2c.3 0 .6 0 .9.1v2.8c-.3-.1-.6-.2-.9-.2-1.4 0-2.6 1.1-2.6 2.6S9.1 17.2 10.6 17.2 13.2 16 13.2 14.6V3H16z" /></svg>
        </button>
        <button className="sicon save" onClick={() => share('save')} title="画像を保存">⬇</button>
      </div>
      <p className="small" style={{ textAlign: 'center', marginTop: 2 }}>X・LINEはテキスト＋リンク／Instagram・TikTokは画像を保存して投稿</p>
    </>
  );
}
