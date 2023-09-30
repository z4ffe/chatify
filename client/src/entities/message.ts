import {DataStruct, MessageStruct, WSEvents} from '../types/contracts/messageStruct.ts'

export class Message implements MessageStruct {
	readonly event
	readonly data

	constructor(event: WSEvents, data: DataStruct) {
		this.event = event
		this.data = data
	}
}