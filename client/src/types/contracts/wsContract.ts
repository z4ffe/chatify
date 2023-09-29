export type WSEvents = 'message' | 'onlineUsers' | 'userIn' | 'userOut' | 'userData' | 'userExist'

export interface WSPayload {
	user: string
	message?: string
	date?: string
	onlineUsers?: number
	clientsList?: string[]
	error?: string
}

export interface WsContract {
	event: WSEvents
	data: WSPayload
}