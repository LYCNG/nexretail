/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 暖色主題
        primary: {
          DEFAULT: "#E07A5F",
          50: "#FCF0ED",
          100: "#F9E1DB",
          200: "#F3C4B7",
          300: "#ECA693",
          400: "#E6896F",
          500: "#E07A5F",
          600: "#D85A3A",
          700: "#B5452A",
          800: "#8A3520",
          900: "#5F2416",
        },
        secondary: {
          DEFAULT: "#81B29A",
          50: "#F0F6F3",
          100: "#E1EDE7",
          200: "#C3DBCF",
          300: "#A5C9B7",
          400: "#87B79F",
          500: "#81B29A",
          600: "#5E9A7C",
          700: "#487860",
          800: "#335644",
          900: "#1E3428",
        },
        accent: {
          DEFAULT: "#F2CC8F",
          50: "#FEFBF4",
          100: "#FDF7E9",
          200: "#FAE9C7",
          300: "#F7DBA5",
          400: "#F4CD83",
          500: "#F2CC8F",
          600: "#EDBA5A",
          700: "#E8A825",
          800: "#B98517",
          900: "#84600F",
        },
        // 背景與表面
        surface: {
          light: "#FFFFFF",
          dark: "#2D2D2D",
        },
        background: {
          light: "#FAF8F5",
          dark: "#1A1A1A",
        },
        // 文字顏色
        text: {
          primary: {
            light: "#3D405B",
            dark: "#F4F1DE",
          },
          secondary: {
            light: "#6B7280",
            dark: "#9CA3AF",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      boxShadow: {
        warm: "0 4px 14px 0 rgba(224, 122, 95, 0.15)",
        "warm-lg": "0 10px 25px -3px rgba(224, 122, 95, 0.2)",
      },
    },
  },
  plugins: [],
};
