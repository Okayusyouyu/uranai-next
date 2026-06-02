/** @type {import('next').NextConfig} */
const nextConfig = {
  // Supabase Storage の画像を next/image で使う場合に許可（今回は <img> 使用なので任意）
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};
export default nextConfig;
