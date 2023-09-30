import {User} from '../../entities/user.ts'

export type WSEvents = 'message' | 'onlineUsers' | 'userIn' | 'userOut' | 'userData' | 'userExist'

export interface DataStruct {
	user: User
	message?: string
	date?: string
	onlineUsers?: number
	clientsList?: string[]
	error?: string
}

export interface MessageStruct {
	event: WSEvents
	data: DataStruct
}