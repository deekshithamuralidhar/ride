const { font_fam } = require("./src/app/utils/styles/fontFamily");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./src/app/**/*.{js,jsx,ts,tsx}"],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#101B53",
        secondary: "#63D6DD",
        black: "#000000",
        white: "#FFFFFF",
        col_1: "#F5F7FB",
        col_2: "#FAFAFA",
        col_3: "#63CFE1",
        text_fade: "#ACB0B8",
        col_4: "#7F909F",
      },
      fontFamily: {
        [font_fam.as_bold]: [[font_fam.as_bold]],
        [font_fam.gantari_semibold]: [[font_fam.gantari_semibold]],
        poppinsBold: ["Poppins-Bold"],
      },
    },
  },
  plugins: [],
};
