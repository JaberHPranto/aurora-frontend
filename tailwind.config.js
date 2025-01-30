/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        onest: ["Onest", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f0f7fe",
          100: "#ddedfc",
          200: "#c2e0fb",
          300: "#98cef8",
          400: "#68b2f2",
          500: "#4493ed",
          600: "#347ae2",
          700: "#2661cf",
          800: "#2550a8",
          900: "#234685",
          950: "#1a2c51",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "hsl(var(--accent-foreground))",
        },
        blue: {
          DEFAULT: "hsl(var(--blue))",
        },
        pink: {
          DEFAULT: "hsl(var(--pink))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neutral: {
          50: "#F2F4F9;",
          100: "#F6F7F8",
          200: "#EBEEF3",
          300: "#A4B0C3",
          400: "#c7c7c7",
          500: "#7C8DB5",
          600: "#6E7991",
          700: "#3D4752",
          800: "#1F2F54",
        },
        black: {
          DEFAULT: "#191D31",
          100: "#201515",
        },
        // gray: {
        //   50: "#E6EDFF",
        //   100: "#D9D9D9",
        //   500: "#667085",
        //   600: "#475467",
        //   700: "#344054",
        //   900: "#101828",
        //   dark: "#666666",
        // },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
