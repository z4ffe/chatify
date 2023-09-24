import {Dispatch, SetStateAction} from 'react'
import {wsEvents} from '../constants/wsEvents.ts'
import {globalActions} from '../store/global/globalSlice.ts'
import store from '../store/store.ts'
import {WSMsgData} from '../types/contracts/wsMessage.ts'


export class WsService {
	constructor(private socket: WebSocket) {
	}

	openConnection(setMessage: Dispatch<SetStateAction<WSMsgData[]>>) {
		this.socket.onopen = () => {
			this.socket.onmessage = (message) => {
				const parsedResponse: WSMsgData = JSON.parse(message.data)
				if (parsedResponse.event === 'onlineUsers') {
					store.dispatch(globalActions.setOnlineUsers(parsedResponse.data.onlineUsers))
				} else {
					setMessage(prevState => [...prevState, parsedResponse])
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