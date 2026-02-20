/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00f0ff",
          purple: "#b000ff",
          blue: "#0066ff",
        },
        dark: {
          900: "#050510",
          800: "#0a0a1a",
          700: "#0d0d24",
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 8s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,240,255,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0,240,255,0.8), 0 0 80px rgba(0,240,255,0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
        "hero-gradient": "linear-gradient(135deg, #050510 0%, #0a0118 50%, #050510 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
