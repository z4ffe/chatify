export type WSEvents = 'message' | 'onlineUsers' | 'userIn' | 'userOut' | 'userData'

export interface WSPayload {
	user: string
	message?: string
	date?: string
	onlineUsers?: number
}

export interface WsContract {
	event: WSEvents
	data: WSPayload
}