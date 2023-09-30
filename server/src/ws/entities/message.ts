import {User} from './user'

export type WSEvents = 'message' | 'onlineUsers' | 'userIn' | 'userOut' | 'userData' | 'userExist'

export interface DataStruct {
	user?: User
	message?: string
	date?: Date
	onlineUsers?: number
	clientsList?: string[]
	error?: string
}

export interface MessageStruct {
	event: WSEvents
	data: DataStruct
}


export class Message implements MessageStruct {
	event: WSEvents
	data: DataStruct

	constructor(event: WSEvents, data: DataStruct) {
		this.event = event
		this.data = data
	}
}