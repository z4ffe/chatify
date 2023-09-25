import {Logger} from '@nestjs/common'
import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets'
import {DataDto, MessageDto} from './dto/messageDto'
import {ClientsList} from './interfaces/clientInterface'
import {WsService} from './ws.service'


@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
	private readonly logger = new Logger('WebSocket Logger')
	private mapClients: ClientsList = new Map<WebSocket, {user: string}>
	private messagesList: MessageDto[] = []

	constructor(private readonly wsService: WsService) {
	}

	afterInit() {
		this.logger.debug('WS Server Starts')
	}

	handleConnection(client: WebSocket) {
		this.wsService.sendMessageForClient(client, this.messagesList)
	}

	@SubscribeMessage('message')
	handleMessage(_: any, data: DataDto) {
		this.wsService.sendMessageForAllClients(this.mapClients, data, this.messagesList)
	}

	@SubscribeMessage('userData')
	handleUserData(client: any, data: DataDto) {
		this.wsService.addClientToList(this.mapClients, client, data.user)
		this.wsService.sendOnlineCount(this.mapClients)
		this.wsService.sendMessageForAllClients(this.mapClients, data, this.messagesList)
	}

	handleDisconnect(client: WebSocket) {
		this.wsService.removeClient(this.mapClients, client)
		this.wsService.sendOnlineCount(this.mapClients)
	}
}
