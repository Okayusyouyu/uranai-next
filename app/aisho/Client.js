'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ORDER, GATES, compatGate } from '../../lib/hachimon';

export default function AishoClient() {
  const [me, setMe] = useState('kai');
  const [you, setYou] = useState('sei');
  const [res, setRes] = useState(null); // {a,b}

  function go() { setRes({ a: me, b: you }); }

  return (
    <div className="wrap">
      <h1>八門 相性診断</h1>
      <div className="sub">あの人との“門の相性”を観る</div>

      <div className="card">
        <label className="fld">あなたの門</label>
        <select value={me} onChange={e => setMe(e.target.value)}>
          {ORDER.map(k => <option key={k} value={k}>{GATES[k].name}／{GATES[k].arche}</option>)}
        </select>
        <label className="fld" style={{ marginTop: 12 }}>相手の門</label>
        <select value={you} onChange={e => setYou(e.target.value)}>
          {ORDER.map(k => <option key={k} value={k}>{GATES[k].name}／{GATES[k].arche}</option>)}
        </select>
        <button className="btn sm" style={{ marginTop: 14 }} onClick={go}>相性を観る</button>
        <p className="small" style={{ marginTop: 8 }}>門が分からない方は <Link href="/shindan">八門診断</Link> で先に占ってください。</p>
      </div>

      {res && <Result a={res.a} b={res.b} />}
      <p className="foot">運命の八門 ― 2026 ／ ※娯楽目的</p>
    </div>
  );
}

function Result({ a, b }) {
  const ga = GATES[a], gb = GATES[b];
  const c = compatGate(a, b);
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div className="small">相性</div>
      <div style={{ fontSize: '1.6rem', color: 'var(--gold)', letterSpacing: '.12em', margin: '.3em 0' }}>{ga.name} × {gb.name}</div>
      <div className="star" style={{ fontSize: '1.5rem' }}>{c.stars}</div>
      <div style={{ display: 'inline-block', background: '#fff8e9', border: '1px solid var(--gold)', borderRadius: 999, padding: '5px 16px', margin: '10px 0', color: 'var(--gold)', fontWeight: 700 }}>{c.cat}</div>
      <p style={{ textAlign: 'left' }}>{c.text}</p>
      <p className="small" style={{ textAlign: 'left' }}>{ga.arche}（{ga.name}・{ga.elem}）× {gb.arche}（{gb.name}・{gb.elem}）。五行の関係から観た相性です。</p>
      <a className="cta" href="/hikaku">🔮 二人の相性をプロに詳しく観てもらう</a>
    </div>
  );
}
