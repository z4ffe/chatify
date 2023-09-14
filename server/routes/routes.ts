import express from 'express'
import expressWs from 'express-ws'
import {wsServices} from '../services/wsServices'

const router = express.Router()
const {app} = expressWs(express())

router.ws('/', wsServices.wsHandler)
router.get('/', (_, res) => {
	res.send(`${new Date()}`)
})

export default router