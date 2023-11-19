/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [
		'custom-checkbox',
	],
	theme: {
		fontFamily: {
			arial: ['Arial'],
		},
		extend: {
			colors: {
				'dark': '#101828',
				'black': '#000000',
				'greyLightScore': '#F1F1F1',
				'greyLight': '#F8F8F8',
				'grey': '#DFDFDF',
				'greyBg': '#D8D8D8',
				'greenButton': '#90D8B2',
				'greenButtonOnClick': '#00BF7D',
				'redLight': '#FFE7E7',
				'redStrong': '#FF0000',
				'greenLight': '#DEFFCA',
				'greenStrong': '#4AC300',
				'greenButtonOnClick': '#00BF7D',
				'greenButtonOnClick': '#00BF7D',
				'orangeLight': '#FFEDDD',
				'orangeStrong': '#FFA800',
			},
		},
	},
	darkMode: ['class', '[data-theme="dark"]'],
	plugins: [],
}
