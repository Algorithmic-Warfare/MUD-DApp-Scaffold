/** @type {import('tailwindcss').Config} */
import { colors } from "./src/config/colors";
export default {
  content: ["*", "./src/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [
    function ({ addBase }) {
      addBase({
        body: {
          "@apply font-sometype bg-crude text-white bg-cover bg-center bg-no-repeat bg-fixed min-h-screen":
            {},
        },
        "::-webkit-scrollbar": {
          "@apply bg-transparent border-1 border-brightquantum": {},
          "scrollbar-width": "thin",
        },
        "::-webkit-scrollbar-thumb": {
          "@apply bg-brightquantum p-[1px]": {},
          "scrollbar-width": "thin",
        },
        "*::focus, *::focus-visible": {
          outline: "none !important",
        },
        "*::selection": {
          "@apply bg-neutral/30": {},
        },
      });
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sometype: ["Sometype Mono", "sans-serif"],
        favorit: ["Favorit", "sans-serif"],
        disket: ["Disket", "sans-serif"],
      },
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
        ...colors,
        darkBackground: "oklch(0.145 0 0)",
        darkForeground: "oklch(0.985 0 0)",
        darkCard: "oklch(0.205 0 0)",
        darkCardForeground: "oklch(0.985 0 0)",
        darkPopover: "oklch(0.205 0 0)",
        darkPopoverForeground: "oklch(0.985 0 0)",
        darkPrimary: "oklch(0.922 0 0)",
        darkPrimaryForeground: "oklch(0.205 0 0)",
        darkSecondary: "oklch(0.269 0 0)",
        darkSecondaryForeground: "oklch(0.985 0 0)",
        darkMuted: "oklch(0.269 0 0)",
        darkMutedForeground: "oklch(0.708 0 0)",
        darkAccent: "oklch(0.269 0 0)",
        darkAccentForeground: "oklch(0.985 0 0)",
        darkDestructive: "oklch(0.704 0.191 22.216)",
        darkBorder: "oklch(1 0 0 / 10%)",
        darkInput: "oklch(1 0 0 / 15%)",
        darkRing: "oklch(0.556 0 0)",
        darkChart1: "oklch(0.488 0.243 264.376)",
        darkChart2: "oklch(0.696 0.17 162.48)",
        darkChart3: "oklch(0.769 0.188 70.08)",
        darkChart4: "oklch(0.627 0.265 303.9)",
        darkChart5: "oklch(0.645 0.246 16.439)",
        darkSidebar: "oklch(0.205 0 0)",
        darkSidebarForeground: "oklch(0.985 0 0)",
        darkSidebarPrimary: "oklch(0.488 0.243 264.376)",
        darkSidebarPrimaryForeground: "oklch(0.985 0 0)",
        darkSidebarAccent: "oklch(0.269 0 0)",
        darkSidebarAccentForeground: "oklch(0.985 0 0)",
        darkSidebarBorder: "oklch(1 0 0 / 10%)",
        darkSidebarRing: "oklch(0.556 0 0)",
      },
    },
  },
};
