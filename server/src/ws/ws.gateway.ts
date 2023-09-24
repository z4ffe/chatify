import {Logger} from '@nestjs/common'
import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets'
import {DataDto, MessageDto} from './dto/messageDto'
import {WsService} from './ws.service'

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
	private readonly logger = new Logger('WebSocket Logger')
	private clients: WebSocket[] = []
	private messagesList: MessageDto[] = []

	constructor(private readonly wsService: WsService) {
	}

	afterInit() {
		this.logger.debug('WS Server Starts')
	}

	handleConnection(client: WebSocket) {
		this.clients.push(client)
		this.wsService.sendOnlineCount(this.clients)
		this.wsService.sendMessageForClient(client, this.messagesList)
	}

	@SubscribeMessage('message')
	handleMessage(_: any, data: DataDto) {
		this.wsService.sendMessageForAllClients(this.clients, data, this.messagesList)
	}

	handleDisconnect(client: WebSocket) {
		this.clients = this.wsService.removeClient(this.clients, client)
		this.wsService.sendOnlineCount(this.clients)
	}
}
