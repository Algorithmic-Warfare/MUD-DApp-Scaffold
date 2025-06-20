/** @type {import('tailwindcss').Config} */
import { colors } from "./src/config/colors";
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
      colors,
    },
  },
};
