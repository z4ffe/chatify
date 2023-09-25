import {CONSTANTS} from '../constants/constants.ts'
import {globalActions} from '../store/global/globalSlice.ts'
import store from '../store/store.ts'
import {WsContract} from '../types/contracts/wsContract.ts'
import {WSMessage} from '../utils/wsMessage.ts'

export class WsService {
	constructor(private socket: WebSocket = new WebSocket(CONSTANTS.WS_URL)) {
	}

	openConnection(handleMessage: (data: WsContract) => void, user: string) {
		this.socket.onopen = () => {
			const userData = new WSMessage('userData', {user})
			this.socket.send(JSON.stringify(userData))
			this.socket.onmessage = (message) => {
				const parsedResponse: WsContract = JSON.parse(message.data)
				switch (parsedResponse.event) {
					case 'message':
						return handleMessage(parsedResponse)
					case 'onlineUsers':
						return store.dispatch(globalActions.setOnlineUsers(parsedResponse.data.onlineUsers))
					case 'userIn':
						return console.log('IN', parsedResponse.data.user)
					case 'userOut':
						return console.log('OUT', parsedResponse.data.user)
					default:
						break
				}
			}
			store.dispatch(globalActions.changeNetworkStatus(this.socket.OPEN))
		}
	}

	sendMessage(user: string, message: string) {
		const newMessage = new WSMessage('message', {user, message})
		this.socket.send(JSON.stringify(newMessage))
	}

	closeConnection() {
		this.socket.close()
		store.dispatch(globalActions.changeNetworkStatus(this.socket.CLOSED))
	}
}