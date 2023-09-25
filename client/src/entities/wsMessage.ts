import {WsContract, WSEvents, WSPayload} from '../types/contracts/wsContract.ts'

export class WSMessage implements WsContract {
	event
	data

	constructor(event: WSEvents, data: WSPayload) {
		this.event = event
		this.data = data
	}
}