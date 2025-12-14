/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    async rewrites() {
        const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
        return [
            {
                source: "/oauth2/:path*",
                destination: `${backendUrl}/oauth2/:path*`,
            },
            {
                source: "/login/oauth2/:path*",
                destination: `${backendUrl}/login/oauth2/:path*`,
            },
            {
                source: "/api/:path*",
                destination: `${backendUrl}/api/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
