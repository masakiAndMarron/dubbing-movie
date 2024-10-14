/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "file-up-border-col": "#9CB3C8",
        "error-field-col": "rgba(255,0,0,0.1)",
        "file-up-bg": "rgba(236,239,255,0.4)",
        "btn-common-col1": "#5BA7FF",
        "text-sub-col": "#9B9B9B",
        "video-post-height": "800px",
      },
    },
  },
  plugins: [],
};
