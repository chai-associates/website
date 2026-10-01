import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 打开网站根目录时，自动转到中文版
  async redirects() {
    return [{ source: "/", destination: "/zh", permanent: false }];
  },
};

export default nextConfig;
