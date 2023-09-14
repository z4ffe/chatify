import WebSocket from 'ws'

let clients: WebSocket[] = []

export const wsServices = {
	async wsHandler(socket: WebSocket) {
		clients.push(socket)
		socket.on('message', (message) => {
			clients.forEach(client => {
				if (client !== socket) {
					console.log(client !== socket)
					client.send(`${message}`)
				}
			})
		})
		socket.onclose = () => {
			clients = clients.filter(client => client !== socket)
		}
	},
}