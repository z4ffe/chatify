import {Injectable} from '@nestjs/common'
import {DataDto, MessageDto} from './dto/messageDto'

@Injectable()
export class WsService {
	sendMessageForClient(client: WebSocket, data: MessageDto[]) {
		if (data.length) {
			data.forEach(msg => {
				client.send(JSON.stringify(msg))
			})
		}
	}

	sendMessageForAllClients(clients: WebSocket[], payload: DataDto, messageList: MessageDto[]) {
		this.messageListHandler(payload, messageList)
		const response = {
			event: 'message',
			data: {
				user: payload.user,
				message: payload.message,
				date: new Date(),
			},
		}
		clients.forEach(client => {
			client.send(JSON.stringify(response))
		})
	}

	messageListHandler(payload: DataDto, messageList: MessageDto[]) {
		const response = {
			event: 'message',
			data: {
				user: payload.user,
				message: payload.message,
				date: new Date(),
			},
		}
		if (messageList.length > 10) {
			messageList.shift()
			return messageList.push(response)
		}
		messageList.push(response)
	}

	removeClient(clients: WebSocket[], currentClient: WebSocket) {
		return clients.filter(client => client !== currentClient)
	}

	sendOnlineCount(clients: WebSocket[]) {
		const response = {event: 'onlineUsers', data: {onlineUsers: clients.length}}
		clients.forEach(client => {
			client.send(JSON.stringify(response))
		})
	}
}
