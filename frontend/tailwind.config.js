/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
		  fontFamily: {
					inria: ["Inria Sans", "sans-serif"],
				},
			colors: {
				java: {
					50: "#f2fbf9",
					100: "#d2f5f0",
					200: "#a4ebe0",
					300: "#6fd9cd",
					400: "#46c1b7",
					500: "#28a49c",
					600: "#1e837e",
					700: "#1c6966",
					800: "#1a5554",
					900: "#1a4746",
					950: "#092a2a",
				},
			},
		},
	},
	plugins: [],
};
