export const apiDownErrorAnimation = {
	initial: {opacity: 0},
	animate: {opacity: 1},
	transition: {
		duration: 0.3,
		scale: {
			type: 'spring',
			damping: 40,
			stiffness: 999,
			restDelta: 0.001,
		},
	},
}