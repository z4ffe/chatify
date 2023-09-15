import WebSocket from 'ws'

let clients: WebSocket[] = []

interface IWSMessage {
	user: string
	message: string
}

export const wsServices = {
	async wsHandler(socket: WebSocket) {
		clients.push(socket)
		socket.on('message', (message: string) => {
			const jsonMsg = JSON.parse(message) as IWSMessage
			const responseMsg = {
				...jsonMsg,
				date: new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hourCycle: 'h24'}),
			}
			const response = JSON.stringify(responseMsg)
			clients.forEach(client => {
				if (client !== socket) {
					client.send(`${response}`)
				} else {
					client.send(`${response}`)
				}
			})
		})
		socket.onclose = () => {
			clients = clients.filter(client => client !== socket)
		}
	},
}