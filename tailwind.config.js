/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#1a1a1a",
        unblockfill: "#FF5733",
        blockfill: "#4CAF50",
        compblockfill: "#FFD700",
        text: "#FFFFFF",
        controls: "#007BFF",
        modalBackground: "rgba(0, 0, 0, 0.8)",
      },
      height: {
        calc: "calc(100vh - 80px)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
