module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				lastYear: '#79B8F6',
				// lastYear: '#094D92',
				secondary: '#fd3a69',
				today: '#094D92',
				// today: '#61b15a',
			},
			fill: (theme) => theme('colors'),
			stroke: (theme) => ({
				lastYear: theme('colors.lastYear'),
				today: theme('colors.today'),
				secondary: theme('colors.secondary'),
			}),
		},
	},
	variants: {},
	plugins: [],
};
