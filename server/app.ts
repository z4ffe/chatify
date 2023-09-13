import express from 'express'
import expressWs from 'express-ws'

const appExpress = express()
const {app} = expressWs(appExpress)

app.get('/', (_, res) => {
	res.send(`${new Date()}`)
})

const clients: any[] = []

app.ws('/', (socket) => {
	clients.push(socket)
	socket.on('message', (message) => {
		clients.forEach(client => {
			if (client !== socket) {
				client.send(`${message}`)
			}
		})
	})
})

const PORT = 5005
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))