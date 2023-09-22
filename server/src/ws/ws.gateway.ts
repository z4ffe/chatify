import {Logger} from '@nestjs/common'
import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets'
import {MessageDto} from './dto/messageDto'
import {WsService} from './ws.service'

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
	private readonly logger = new Logger('WebSocket Logger')
	private clients: WebSocket[] = []

	constructor(private readonly wsService: WsService) {
	}

	afterInit() {
		this.logger.debug('WS Server Starts')
	}

	handleConnection(client: WebSocket) {
		this.clients.push(client)
	}

	@SubscribeMessage('message')
	handleMessage(client: unknown, data: MessageDto) {
		const response = {
			...data,
			date: new Date(),
			client: this.clients.length,
		}
		this.clients.forEach(cl => {
			cl.send(JSON.stringify(response))
		})
	}

	@SubscribeMessage('online-users')
	handleOnlineUsers(client: any, data: MessageDto) {
		const response = {onlineUsers: this.clients.length}
		client.send(JSON.stringify(response))
	}

	handleDisconnect(client: WebSocket) {
		this.clients = this.clients.filter(cl => client !== cl)
	}
}
