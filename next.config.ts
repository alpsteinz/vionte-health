import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Google yorumlarındaki yazar profil fotoğrafları
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
};

export default nextConfig;
