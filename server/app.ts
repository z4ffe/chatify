import express from 'express'
import expressWs from 'express-ws'
import cors from 'cors'
import * as https from 'https'
import {credentials} from './config/certOptions'
import router from './routes/routes'

const appExpress = express()
const app = expressWs(appExpress).app

app.use(cors())
app.use(router)

const PORT = 5005
const httpsServer = https.createServer(credentials, app)

const launch = () => {
	try {
		httpsServer.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
	} catch (error) {
		console.error(error)
	}
}

launch()