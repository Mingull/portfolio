/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				burtons: "burtons",
				opensans: "'Open sans', sans-serif",
				roboto: "'Roboto', sans-serif",
				pacifico: "'Pacifico', cursive",
			},
			keyframes: {
				"bounce-in": {
					"0%": { transform: "translateY(-50%)" },
					"100%": { transform: "translateY(0%)" },
				},
				"bounce-out": {
					"0%": { transform: "translateY(-50%)" },
					"100%": { transform: "translateY(0%)" },
				},
			},
			animation: {
				"bounce-in": "bounce-in 1s ease forwards",
				"bounce-out": "bounce-out 1s ease forwards",
			},
		},
	},
	plugins: [],
};
