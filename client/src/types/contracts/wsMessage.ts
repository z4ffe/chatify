export interface WSMsgData {
	event: string,
	data: {
		user: string
		message: string
		date: string
		onlineUsers: number
	}
}