import express from 'express'
import expressWs from 'express-ws'
import mainController from '../controllers/main.controller'
import {wsServices} from '../services/wsServices'

const router = express.Router()
const app = expressWs(express()).app
//

router.ws('/', wsServices.wsHandler)

//

router.get('/health', mainController.healthCheck)

export default router