import {Logger} from '@nestjs/common'
import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets'
import {DataDto, MessageDto} from './dto/messageDto'
import {User} from './entities/user'
import {ClientsList} from './interfaces/clientInterface'
import {WsService} from './ws.service'

@WebSocketGateway({path: '/ws'})
export class WsGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
	private readonly logger = new Logger('WebSocket Logger')
	private clients: ClientsList = new Map<WebSocket, User>
	private messagesList: MessageDto[] = []

	constructor(private readonly wsService: WsService) {
	}

	get clientsList() {
		return this.clients
	}

	afterInit() {
		this.logger.debug('WS Server Starts')
	}

	handleConnection(client: WebSocket) {
		this.wsService.sendMessageForClient(client, this.messagesList)
	}

	@SubscribeMessage('message')
	handleMessage(_: any, data: DataDto) {
		this.wsService.sendMessageForAllClients(this.clients, data, this.messagesList)
	}

	@SubscribeMessage('userData')
	handleUserData(client: any, data: DataDto) {
		this.wsService.addClientToList(this.clients, client, data.user)
		this.wsService.sendOnlineCount(this.clients)
		this.wsService.sendMessageForAllClients(this.clients, data, this.messagesList)
	}

	handleDisconnect(client: WebSocket) {
		this.wsService.removeClient(this.clients, client)
		this.wsService.sendOnlineCount(this.clients)
	}
}
