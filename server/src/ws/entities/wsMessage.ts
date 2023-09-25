export type WSEvents = 'message' | 'onlineUsers' | 'userIn' | 'userOut' | 'userData' | 'userExist'

export interface WSPayload {
	user: string
	message?: string
	date?: Date
	onlineUsers?: number
	error?: string
}

export interface WsContract {
	event: WSEvents
	data: WSPayload
}


export class WsMessage implements WsContract {
	event: WSEvents
	data: WSPayload

	constructor(event: WSEvents, data: WSPayload) {
		this.event = event
		this.data = data
	}
}