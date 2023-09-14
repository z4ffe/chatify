import {EStatus} from '../types/enum/Status.ts'

export const readyStateHandler = (readyState: number) => {
	switch (readyState) {
		case(0):
			return EStatus.connecting
		case(1):
			return EStatus.connected
		case(3):
			return EStatus.disconnected
		default:
			return EStatus.connecting
	}
}