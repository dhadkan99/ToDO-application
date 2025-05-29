import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  plugins: ["daisyui"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{html,js}",
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
 
    
};

export default nextConfig;
