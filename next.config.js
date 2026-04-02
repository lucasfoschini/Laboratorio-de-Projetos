/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
      { protocol: "https", hostname: "*.githubusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "*.gstatic.com" },
      { protocol: "https", hostname: "*.cloudinary.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "imgur.com" },
    ],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3334";
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`, // Proxy para o backend
      },
    ];
  },
};

module.exports = nextConfig;