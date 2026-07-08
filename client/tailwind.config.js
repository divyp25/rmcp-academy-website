// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        animation: {
          zoom: "zoomInOut 5s infinite ease-in-out",
        },
        keyframes: {
          zoomInOut: {
            "0%, 100%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.1)" },
          },
        },
      },
    },
    plugins: [],
  };
  