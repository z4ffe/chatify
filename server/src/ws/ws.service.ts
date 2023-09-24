import {Injectable} from '@nestjs/common'
import {MessageDto} from './dto/messageDto'

@Injectable()
export class WsService {
	sendMessageForAllClients(clients: WebSocket[], data: MessageDto) {
		const response = {
			...data,
			date: new Date(),
		}
		clients.forEach(client => {
			client.send(JSON.stringify(data))
		})
	}

	removeClient(clients: WebSocket[], currentClient: WebSocket) {
		return clients.filter(client => client !== currentClient)
	}

	sendCurrentOnlineCount(clients: WebSocket[]) {
		const response = {event: 'onlineUsers', data: {onlineUsers: clients.length}}
		clients.forEach(client => {
			client.send(JSON.stringify(response))
		})
	}
}
