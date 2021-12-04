module.exports = {
  // mode: 'jit',
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#EA4524",
          light: "#F2856F",
          light2: "#FEFDF6",
          white: "#FEF9F6",
        },
        black: {
          DEFAULT: "#000000",
          bold: "#14183E",
          light: "#333333",
          content: "#4F4F4F",
        },
        gray: {
          DEFAULT: "#989898",
          light: "#828282",
          light2: "#989898",
          light3: "#E5E5E5",
          light4: "#6E7491",
          light5: "#989898",
          light6: "#EBEBEC",
          light7: "#ABAFB5",
          light8: "#B4B5B6",
        },
        green: {
          DEFAULT: "#007B65",
          dark: "#00B493",
          light: "#EAFFFB",
        },
        red: {
          DEFAULT: "#CA4343",
          white: "#FFF5F5",
        },
        blue: {
          DEFAULT: "#605DEC",
        },
        beach: "#F4F2F2",
        outline: "#FCEFE8",
        pill: "#0F0F0F",
      },
      fontFamily: {
        logo: ["raleway-800"],
        smith: ["smith-allison"],
        "circular-black": ["circular-900"],
        "circular-bold": ["circular-700"],
      },
      fontSize: {
        xxs: "10px",
        base: "1.125rem",
        hero: ["9.16rem", "11.56rem"],
        "sub-hero": ["29.266rem", "24.232rem"],
        "sub-hero-md": ["19rem"],
        14: ["0.875rem", "1.125rem"],
        26: ["1.625rem", "2.056rem"],
        32: ["2rem"],
        40: ["2.5rem", "3.188rem"],
        64: ["4rem"],
        80: ["5rem", "6.313rem"],
        130: ["8rem"],
        200: ["12.5rem", "165px"],
      },
      backgroundImage: {
        hero: "url('/hero-image.png')",
        "destination-backdrop": "url('/destination-backdrop.png')",
      },
      padding: {
        "2/5": "40%",
        "2/3": "66%",
        "5/8": "62.5%",
      },
      height: {
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
        500: "34.563rem",
      },
      width: {
        300: "19.375rem",
        400: "400px",
        "70per": "70%",
        "30per": "30%",
      },
      maxWidth: {
        xxs: "18.5rem",
        "4xxl": "972px",
        400: "400px",
      },
      minWidth: {
        400: "400px",
      },
      dropShadow: {
        card: "0px 4px 14px rgba(56, 10, 0, 0.3)",
      },
      borderRadius: {
        10: "0.625rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
