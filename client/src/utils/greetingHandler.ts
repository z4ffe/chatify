import {EGreetings} from '../types/enum/greetings.ts'

export const greetingHandler = (): EGreetings => {
	const currentHour = new Date().getHours()
	switch (true) {
		case(currentHour < 9):
			return EGreetings.morning
		case(currentHour > 9 && currentHour < 17):
			return EGreetings.day
		case(currentHour > 17 && currentHour < 23):
			return EGreetings.evening
		case(currentHour > 9 && currentHour < 0):
			return EGreetings.night
		default:
			return EGreetings.day
	}
}