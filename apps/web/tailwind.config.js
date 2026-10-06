/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#07203F',      /* Locked Primary Navy */
          surface: '#041326',      /* Deep Dark Frame */
          secondary: '#F5F3E1',    /* Warm Cream Accent */
          tertiary: '#667085',     /* Slate Gray / Steel */
          neutral: '#F8F7F5',      /* Ground Canvas Neutral */
        },
        "secondary": "#5f5f51", 
        "on-secondary-container": "#646355", 
        "on-primary-container": "#7388ad", 
        "tertiary-container": "#162032", 
        "on-tertiary-fixed-variant": "#3d475a", 
        "inverse-primary": "#b2c7ef", 
        "error-container": "#ffdad6", 
        "outline": "#74777f", 
        "surface-container": "#efeeec", 
        "on-secondary-fixed-variant": "#47483b", 
        "error": "#ba1a1a", 
        "on-primary": "#ffffff", 
        "inverse-surface": "#2f3130", 
        "surface-container-highest": "#e3e2e0", 
        "tertiary": "#010819", 
        "on-surface-variant": "#44474e", 
        "surface-variant": "#e3e2e0", 
        "tertiary-fixed": "#d9e3fb", 
        "background": "#faf9f7", 
        "on-secondary": "#ffffff", 
        "on-error": "#ffffff", 
        "tertiary-fixed-dim": "#bdc7de", 
        "on-background": "#1a1c1b", 
        "on-secondary-fixed": "#1c1c12", 
        "surface-dim": "#dadad8", 
        "on-primary-fixed": "#021b3a", 
        "inverse-on-surface": "#f1f1ef", 
        "on-error-container": "#93000a", 
        "surface-tint": "#4a5f81", 
        "secondary-container": "#e2e0cf", 
        "surface-container-low": "#f4f3f1", 
        "on-tertiary": "#ffffff", 
        "secondary-fixed": "#e5e3d2", 
        "primary-container": "#07203f", 
        "on-surface": "#1a1c1b", 
        "outline-variant": "#c4c6cf", 
        "secondary-fixed-dim": "#c9c7b6", 
        "primary-fixed": "#d5e3ff", 
        "on-primary-fixed-variant": "#324768", 
        "surface-container-high": "#e9e8e6", 
        "primary": "#000819", 
        "on-tertiary-fixed": "#111c2d", 
        "surface-container-lowest": "#ffffff", 
        "surface": "#faf9f7", 
        "on-tertiary-container": "#7e889d", 
        "surface-bright": "#faf9f7", 
        "primary-fixed-dim": "#b2c7ef"
      },
      borderRadius: {
        "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"
      },
      spacing: {
        "gutter-sm": "1rem",
        "margin": "2rem",
        "space-md": "1rem",
        "margin-desktop": "3rem",
        "space-xxs": "0.25rem",
        "space-sm": "0.75rem",
        "gutter-lg": "2rem",
        "space-xl": "2rem",
        "gutter": "1.5rem",
        "space-2xl": "3rem",
        "space-xs": "0.5rem",
        "space-lg": "1.5rem",
        "space-3xl": "4.5rem",
        "margin-mobile": "1.25rem",
        "margin-lg": "2rem",
        "margin-md": "1.5rem"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Newsreader', 'serif'],
        "title-md": ["Inter"], "display-lg": ["Inter"], "label-sm": ["Inter"], "body-sm": ["Inter"], "headline-lg-mobile": ["Inter"], "headline-sm": ["Inter"], "headline-lg": ["Inter"], "label-md": ["Inter"], "body-lg": ["Inter"], "headline-md": ["Inter"], "body-md": ["Inter"], "caption": ["Inter"],
        "display-hero": ["Inter"], "label-uppercase": ["Inter"], "label-regular": ["Inter"], "display-hero-mobile": ["Inter"], "title-sm": ["Inter"]
      },
      fontSize: {
        "title-md": ["16px", { lineHeight: "24px", letterSpacing: "-0.005em", fontWeight: "600" }],
        "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
        "body-sm": ["13px", { lineHeight: "18px", fontWeight: "400" }],
        "headline-lg-mobile": ["26px", { lineHeight: "34px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "caption": ["11px", { lineHeight: "14px", letterSpacing: "0.02em", fontWeight: "500" }],
        "display-hero": ["56px", { lineHeight: "64px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "label-uppercase": ["11px", { lineHeight: "16px", letterSpacing: "0.08em", fontWeight: "700" }],
        "label-regular": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
        "display-hero-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.025em", fontWeight: "700" }],
        "title-sm": ["15px", { lineHeight: "22px", letterSpacing: "0em", fontWeight: "600" }]
      }
    },
  },
  plugins: [],
}
