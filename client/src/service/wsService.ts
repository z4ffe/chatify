import {CONSTANTS} from '../constants/constants.ts'
import {wsEvents} from '../constants/wsEvents.ts'
import {globalActions} from '../store/global/globalSlice.ts'
import store from '../store/store.ts'
import {WSMsgData} from '../types/contracts/wsMessage.ts'


export class WsService {
	constructor(private socket: WebSocket = new WebSocket(CONSTANTS.WS_URL)) {
	}

	openConnection(handleMessage: (data: WSMsgData) => void, user: string) {
		this.socket.onopen = () => {
			const userData = {
				event: 'userData',
				data: {
					user: user,
				},
			}
			this.socket.send(JSON.stringify(userData))
			this.socket.onmessage = (message) => {
				const parsedResponse: WSMsgData = JSON.parse(message.data)
				if (parsedResponse.event === 'onlineUsers') {
					store.dispatch(globalActions.setOnlineUsers(parsedResponse.data.onlineUsers))
				} else if (parsedResponse.event === 'userIn') {
					console.log('IN', parsedResponse.data.user)
				} else if (parsedResponse.event === 'userOut') {
					console.log('OUT', parsedResponse.data.user)
				} else {
					handleMessage(parsedResponse)
				}
			}
			store.dispatch(globalActions.changeNetworkStatus(this.socket.OPEN))
		}
	}

	sendMessage(user: string, message: string) {
		const payload = {
			event: wsEvents.message,
			data: {
				user,
				message,
			},
		}
		this.socket.send(JSON.stringify(payload))
	}

	closeConnection() {
		this.socket.close()
		store.dispatch(globalActions.changeNetworkStatus(this.socket.CLOSED))
	}
}