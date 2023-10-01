import {Injectable, Logger} from '@nestjs/common'
import {DataDto, MessageDto} from './dto/messageDto'
import {Message} from './entities/message'
import {User} from './entities/user'
import {ClientsList} from './interfaces/clientInterface'

@Injectable()
export class WsService {
	private readonly logger = new Logger('WsService Logger')
	private readonly maxMessageHistory = 30

	addClientToList(clients: ClientsList, client: WebSocket, user: User) {
		const userExist = this.findClientByUser(clients, user)
		if (userExist) {
			const payload = new Message('userExist', {user, error: 'User already exist'})
			client.send(JSON.stringify(payload))
			return client.close()
		}
		const payload = new Message('userIn', {user: user})
		clients.forEach((_, client) => {
			client.send(JSON.stringify(payload))
		})
		clients.set(client, user)
	}

	sendMessageForClient(client: WebSocket, data: MessageDto[]) {
		if (data.length) {
			data.forEach(msg => {
				client.send(JSON.stringify(msg))
			})
		}
	}

	sendMessageForAllClients(clients: ClientsList, payload: DataDto, messageList: MessageDto[]) {
		this.messageListHandler(payload, messageList)
		const newMessage = new Message('message', {user: payload.user, message: payload.message, date: new Date()})
		clients.forEach((_, client) => {
			client.send(JSON.stringify(newMessage))
		})
	}

	messageListHandler(payload: DataDto, messageList: MessageDto[]) {
		const newMessage = new Message('message', {user: payload.user, message: payload.message, date: new Date()})
		if (messageList.length > this.maxMessageHistory) {
			messageList.shift()
			return messageList.push(newMessage)
		}
		messageList.push(newMessage)
	}

	removeClient(clients: ClientsList, currentClient: WebSocket) {
		const newMessage = new Message('userOut', {user: clients.get(currentClient)})
		clients.forEach((_, client) => {
			client.send(JSON.stringify(newMessage))
		})
		clients.delete(currentClient)
	}

	sendOnlineCount(clients: ClientsList) {
		let clientsList = []
		for (const client of clients.values()) {
			clientsList.push(client)
		}
		const payload = new Message('onlineUsers', {user: {name: '', avatar: '', agent: ''}, onlineUsers: clients.size, clientsList: clientsList})
		clients.forEach((_, client) => {
			client.send(JSON.stringify(payload))
		})
	}

	findClientByUser(clients: ClientsList, user: User) {
		let userExist = false
		clients.forEach((currentUser, _) => {
			if (currentUser.name === user.name) {
				userExist = true
			}
		})
		return userExist
	}
}
