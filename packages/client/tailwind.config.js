/** @type {import('tailwindcss').Config} */
export default {
  content: ["*", "./src/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      fontSize: {
        "2xs": ["0.625rem"],
      },
      screens: {
        mobile: { max: "580px" },
        xs: "375px",
        sm: "390px",
        md: "810px",
        lg: "1200px",
      },
      colors: {
        neutral: {
          DEFAULT: "hsla(60, 100%, 92%, 1)",
          20: "hsla(60, 100%, 92%, 0.2)",
        },
        crude: {
          DEFAULT: "hsla(20, 65%, 5%, 1)",
          btn: "hsla(220, 5%, 12%, 0.7)",
          2: "hsla(223, 7%, 58%, 1)",
          3: "hsla(222, 5%, 52%, 1)",
          5: "hsla(20, 65%, 5%, 0.5)",
          7: "hsla(225, 5%, 16%, 1)",
          9: "hsla(210, 5%, 8%, 1)",
        },
        quantum: {
          DEFAULT: "hsl(43, 100%, 59%)",
          2: "hsla(43, 100%, 59%, 70%)",
          8: "hsla(23, 95%, 40%, 0.8)",
          btn: "hsla(43, 100%, 59%, 30%)",
        },
        brightquantum: {
          DEFAULT: "hsla(26, 85%, 58%, 1)",
          5: "hsla(26, 85%, 58%, 0.5)",
        },
        blue: {
          warn: "hsla(232, 89%, 45%, 0.8)",
        },
        grayneutral: {
          DEFAULT: "hsla(55, 9%, 51%, 1)",
        },
      },
    },
  },
};
