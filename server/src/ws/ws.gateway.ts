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
		this.wsService.sendCurrentOnlineCount(this.clients)
	}

	@SubscribeMessage('message')
	handleMessage(_: any, data: MessageDto) {
		this.wsService.sendMessageForAllClients(this.clients, data)
	}

	handleDisconnect(client: WebSocket) {
		this.clients = this.wsService.removeClient(this.clients, client)
		this.wsService.sendCurrentOnlineCount(this.clients)
	}
}
