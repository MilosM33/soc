/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        roadMove: "roadmove 2s linear infinite",
        cartRotate: "cartrotate 2s linear infinite",
        skeleton: "skeleton 7s linear infinite",
      },
      keyframes: {
        roadmove: {
          "0%": { backgroundPosition: "-150px 0%" },
          "100%": { backgroundPosition: "150% 0%" },
        },
        cartrotate: {
          "0%": { transform: "translateX(5px) rotate(-30deg)" },
          "50%": { transform: "rotate(0deg)" },
          "100%": { transform: "translateX(0px) rotate(-30deg)" },
        },
        skeleton: {
          "0%": { backgroundPosition: "-100vw 0%" },
          "100%": { backgroundPosition: "150% 0%" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
