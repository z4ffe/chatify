import {wsEvents} from '../constants/wsEvents.ts'
import {globalActions} from '../store/global/globalSlice.ts'
import store from '../store/store.ts'
import {WSMsgData} from '../types/contracts/wsMessage.ts'


export class WsService {
	constructor(private socket: WebSocket) {
	}

	openConnection(handleMessage: (data: WSMsgData) => void) {
		this.socket.onopen = () => {
			this.socket.onmessage = (message) => {
				const parsedResponse: WSMsgData = JSON.parse(message.data)
				console.log(parsedResponse)
				if (parsedResponse.event === 'onlineUsers') {
					store.dispatch(globalActions.setOnlineUsers(parsedResponse.data.onlineUsers))
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