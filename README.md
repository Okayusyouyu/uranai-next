# 運命の八門 — Next.js（Vercelデプロイ用）

静的サイト(`uranai-hachimon/`)からの移行版。記事はSupabaseからSSG/ISRで実HTML配信（SEO）、サムネは `/api/og` 動的生成（クラウド完結）。

## ローカル
```
cd uranai-next
npm install
cp .env.local.example .env.local   # 値は記入済み（Supabaseの公開URL/anonキー）
npm run dev    # http://localhost:3000
```

## Vercelデプロイ（GitHub連携）
1. このフォルダをGitHubリポジトリにpush
2. Vercel → New Project → リポジトリをimport（Root Directory に `uranai-next` を指定）
3. **Environment Variables** を設定:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://hcofwkdwajmexqzxkmxj.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_...`（公開OK）
   - `NEXT_PUBLIC_SITE_URL` = デプロイ後のURL（例 `https://unmei-hachimon.vercel.app`）
4. Deploy → `xxx.vercel.app` で公開
5. `NEXT_PUBLIC_SITE_URL` を実URLに更新して再デプロイ（OGP絶対URL用）

## 仕組み
- `app/blog/[slug]/page.js` … 記事（SSG＋ISR revalidate=3600）。generateMetadata（OGP）・FAQ構造化データ・Article JSON-LD。本文内の `xxx.html` リンクはNextルートへ自動変換。
- `app/api/og/route.js` … `/api/og?title=..&cat=..` で1200×630のOGP画像を動的生成（Noto Serif JPサブセット）。サムネはこれで自動（ローカルgen-thumbs不要）。
- 新記事（n8nがSupabaseにINSERT）は **ISRで最大1時間後に自動反映**。即時にしたい場合はVercelのOn-Demand Revalidation（/api/revalidate）をn8nから叩く構成も可。

## 未移植（次タスク）
- 診断系の本実装：`/shindan` `/today` `/zukan` `/aisho`（現在は準備中ページ。shared.jsのロジックをクライアントComponentへ移植）
- `/hikaku` 比較表の実装（A8案件確定後に実データ）
- `/about` 運営者情報の記入（E-E-A-T）
- 独自ドメイン、sitemap.xml、X/Instagram自動投稿
