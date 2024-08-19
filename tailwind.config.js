/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                Montserrat: ["Montserrat", "Helvetica", "Arial", "sans-serif"],
            },
            backgroundImage: {
                moonlitAsteroid: "linear-gradient(to right, #2C5364, #203A43, #0F2027)",
                royal: "linear-gradient(to right, #141e30, #243b55);",
            },
        },
    },
    plugins: [],
};
