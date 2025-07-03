/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false, 
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true
  }  
};

export default nextConfig;
