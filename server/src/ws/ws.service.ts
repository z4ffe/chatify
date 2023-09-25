import {Injectable, Logger} from '@nestjs/common'
import {DataDto, MessageDto} from './dto/messageDto'
import {WsMessage} from './entities/wsMessage'
import {ClientsList} from './interfaces/clientInterface'

@Injectable()
export class WsService {
	private readonly logger = new Logger('WsService Logger')
	private readonly maxMessageHistory = 30

	addClientToList(clients: ClientsList, client: WebSocket, user: string) {
		const userExist = this.findClientByUser(clients, user)
		if (userExist) {
			const payload = new WsMessage('userExist', {user, error: 'User already exist'})
			client.send(JSON.stringify(payload))
			return client.close()
		}
		const payload = new WsMessage('userIn', {user: user})
		clients.forEach((_, client) => {
			client.send(JSON.stringify(payload))
		})
		clients.set(client, {user})
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
		const newMessage = new WsMessage('message', {user: payload.user, message: payload.message, date: new Date()})
		clients.forEach((_, client) => {
			client.send(JSON.stringify(newMessage))
		})
	}

	messageListHandler(payload: DataDto, messageList: MessageDto[]) {
		const newMessage = new WsMessage('message', {user: payload.user, message: payload.message, date: new Date()})
		if (messageList.length > this.maxMessageHistory) {
			messageList.shift()
			return messageList.push(newMessage)
		}
		messageList.push(newMessage)
	}

	removeClient(clients: ClientsList, currentClient: WebSocket) {
		const newMessage = new WsMessage('userOut', clients.get(currentClient))
		clients.forEach((_, client) => {
			client.send(JSON.stringify(newMessage))
		})
		clients.delete(currentClient)
	}

	sendOnlineCount(clients: ClientsList) {
		const payload = new WsMessage('onlineUsers', {user: '', onlineUsers: clients.size})
		clients.forEach((_, client) => {
			client.send(JSON.stringify(payload))
		})
	}

	findClientByUser(clients: ClientsList, user: string) {
		let userExist = false
		clients.forEach((currentUser, _) => {
			if (currentUser.user === user) {
				userExist = true
			}
		})
		return userExist
	}
}
