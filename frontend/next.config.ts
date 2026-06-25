import type { NextConfig } from "next";

/**
 * @file next.config.ts
 * @role  Configuration Next.js pour le projet Assigame.
 *
 * @rewrites
 *  Proxy transparent /api/* → http://localhost:8080/api/*
 *  Permet d'éviter les erreurs CORS en développement.
 *  En production, remplacer localhost:8080 par l'URL du serveur réel.
 *
 * @images
 *  Domaines autorisés pour le composant next/image.
 *  Ajouter ici les domaines des CDN si des images externes sont utilisées.
 */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8081/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
    ],
  },
};

export default nextConfig;
