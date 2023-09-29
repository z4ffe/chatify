import {WSMessage} from '../entities/wsMessage.ts'
import {globalActions} from '../store/global/globalSlice.ts'
import store from '../store/store.ts'
import {WsContract} from '../types/contracts/wsContract.ts'
import {LocalStorageHandler} from '../utils/localStorageHandler.ts'

const WS_URL = import.meta.env.VITE_WS_URL

export class WsService {
	constructor(private socket: WebSocket = new WebSocket(WS_URL)) {
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
						store.dispatch(globalActions.setOnlineUsers(parsedResponse.data.onlineUsers))
						return store.dispatch(globalActions.setClientsList(parsedResponse.data.clientsList))
					case 'userIn':
						return handleMessage(parsedResponse)
					case 'userOut':
						return handleMessage(parsedResponse)
					case 'userExist':
						LocalStorageHandler.removeUser()
						return store.dispatch(globalActions.resetState())
					default:
						break
				}
			}
			store.dispatch(globalActions.changeNetworkStatus(this.socket.OPEN))
		}
		this.socket.onclose = () => {
			store.dispatch(globalActions.changeNetworkStatus(this.socket.CLOSED))
		}
	}

	sendMessage(user: string, message: string) {
		const newMessage = new WSMessage('message', {user, message})
		this.socket.send(JSON.stringify(newMessage))
	}

	closeConnection() {
		console.log('asd')
		this.socket.close()
		store.dispatch(globalActions.changeNetworkStatus(this.socket.CLOSED))
	}
}