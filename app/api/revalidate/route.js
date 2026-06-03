/* On-demand ISR：n8nが記事公開直後に叩いて、トップ/一覧/該当記事を即再生成する。
   ?secret=... は Vercel 環境変数 REVALIDATE_SECRET と一致が必須。slugは任意。
   articles タグ付きの fetch キャッシュ（getArticles/getArticle）も同時にパージ。 */
import { revalidatePath, revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

function run(secret, slug) {
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  revalidateTag('articles');
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page'); // 動的セグメント全体を確実にパージ（削除記事の404化に必要）
  if (slug) revalidatePath(`/blog/${slug}`);
  return Response.json({ revalidated: true, slug: slug || null });
}

export async function POST(req) {
  const u = new URL(req.url);
  return run(u.searchParams.get('secret'), u.searchParams.get('slug'));
}
export async function GET(req) {
  const u = new URL(req.url);
  return run(u.searchParams.get('secret'), u.searchParams.get('slug'));
}
