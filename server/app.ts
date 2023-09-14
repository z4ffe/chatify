import cors from 'cors'
import express from 'express'
import expressWs from 'express-ws'
import WebSocket from 'ws'
import router from './routes/routes'

const app = expressWs(express()).app

let clients: WebSocket[] = []

app.use(cors())
app.use(router)

const PORT = 5005

const launch = () => {
	try {
		app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
	} catch (error) {
		console.error(error)
	}
}

launch()