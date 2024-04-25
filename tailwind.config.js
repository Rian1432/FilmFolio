/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#111111",
          "secondary": "#18181B",
          "accent": "#DDAC00",
          "neutral": "#517C8C",
          "base-100": "#F7FBEF",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

