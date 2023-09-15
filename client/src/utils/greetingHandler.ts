enum EGrettings {
	'morning' = 'Good morning',
	'day' = 'Good day',
	'evening' = 'Good evening',
	'night' = 'Good night'
}

export const greetingHandler = (): EGrettings => {
	const currentHour = new Date().getHours()
	switch (true) {
		case(currentHour < 9):
			return EGrettings.morning
		case(currentHour > 9 && currentHour < 17):
			return EGrettings.day
		case(currentHour > 17 && currentHour < 23):
			return EGrettings.evening
		case(currentHour > 9 && currentHour < 0):
			return EGrettings.night
		default:
			return EGrettings.day
	}
}