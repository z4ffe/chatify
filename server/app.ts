import express from 'express'
import expressWs from 'express-ws'
import router from './routes/routes'

const appExpress = express()
const {app, applyTo} = expressWs(appExpress)

app.use(router)

const PORT = 5005
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))