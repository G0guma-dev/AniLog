import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ✅ 여러 외부 사이트 이미지 허용 (권장: https만)
    remotePatterns: [
      // namu.wiki
      { protocol: "https", hostname: "i.namu.wiki" },

      // 자주 쓰는 이미지 호스트들(필요시 추가)
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "imgur.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "s4.anilist.co" },
      { protocol: "https", hostname: "anilist.co" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "media.discordapp.net" },
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },

      // ✅ Supabase Storage 쓰면 여기 꼭 필요
      // 예: https://xxxx.supabase.co/storage/v1/object/public/...
      { protocol: "https", hostname: "https://eimctazerkmjaxhqrzzi.supabase.co" },
    ],
  },
};

export default nextConfig;
