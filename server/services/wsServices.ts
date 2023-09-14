import WebSocket from 'ws'

export const wsServices = {
	async wsHandler (socket: WebSocket) {
		let clients: WebSocket[] = []
		clients.push(socket)
		socket.on('message', (message) => {
			socket.send('asd')
			clients.forEach(client => {
				if (client !== socket) {
					client.send(`${message}`)
				}
			})
		})
		socket.onclose = () => {
			clients = clients.filter(client => client !== socket)
		}
	}
}