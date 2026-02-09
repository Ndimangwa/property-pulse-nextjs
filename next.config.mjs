/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental:	{
    serverActions: {
      bodySizeLimit: '10mb'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
