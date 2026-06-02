/* コラムのランキング表示（最新・人気で共用）。番号＋サムネ＋タイトル。 */
import Link from 'next/link';
import { thumbFor } from '../../lib/supabase';

export default function ColumnRanking({ title, items, children }) {
  return (
    <div className="card">
      <h3 className="sect-h">{title}</h3>
      {items.length === 0 && <p className="small">コラムを準備中です。</p>}
      <ol className="rank-list">
        {items.map((a, i) => (
          <li key={a.id} className="rank-item">
            <div className="rank-num">{i + 1}</div>
            <img className="rank-thumb" src={thumbFor(a)} loading="lazy" alt="" />
            <Link href={`/blog/${a.slug}`} style={{ flex: 1 }}>
              <div className="rt">{a.title}</div>
              <div className="rc">{a.cat}・{a.date}</div>
            </Link>
          </li>
        ))}
      </ol>
      {children}
    </div>
  );
}
