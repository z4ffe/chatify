import {Controller, Get, HttpStatus, Param, Res} from '@nestjs/common'
import {Response} from 'express'
import {WsGateway} from '../ws/ws.gateway'
import {WsService} from '../ws/ws.service'

interface UserParam {
	login: string
}

@Controller('user')
export class UserController {
	constructor(private readonly wsService: WsService, private readonly wsGateway: WsGateway) {
	}

	@Get('/:login')
	async checkUserExist(@Param() param: UserParam, @Res() res: Response) {
		const clients = this.wsGateway.clientsList
		const userExist = this.wsService.findClientByUser(clients, param.login)
		if (userExist) {
			res.status(HttpStatus.CONFLICT).send({message: 'User already exist'})
		}
		res.status(HttpStatus.OK).end()
	}
}
