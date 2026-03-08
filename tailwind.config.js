/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: "#0066F5",
          light: "#E8F0FE",
          dark: "#0044CC",
        },
        background: {
          primary: "#FFFFFF",
          secondary: "#F7F9FF",
        },
        text: {
          primary: "#0A1929",
          muted: "#6B7A99",
        },
        success: "#00C48C",
        warning: "#F5A623",
        danger: "#FF4D4F",
      },
      boxShadow: {
        card: "0 2px 20px rgba(0, 102, 245, 0.08)",
      },
      borderRadius: {
        card: "16px",
        input: "12px",
        button: "12px",
      },
    },
  },
  plugins: [],
};
