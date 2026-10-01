import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 全站 404（app/global-not-found.tsx）：语言放在网址里，所以需要这个设定
  experimental: { globalNotFound: true },
  // 打开网站根目录时，自动转到中文版
  async redirects() {
    return [{ source: "/", destination: "/zh", permanent: false }];
  },
};

export default nextConfig;
