import {Controller, Get, HttpStatus, Param, Res} from '@nestjs/common'
import {Response} from 'express'
import {UserParam} from './interfaces/userParam'
import {WsGateway} from './ws.gateway'
import {WsService} from './ws.service'

@Controller('user')
export class WsController {
	constructor(private readonly wsService: WsService, private readonly wsGateway: WsGateway) {
	}


	@Get('/:login')
	async checkUserExist(@Param() param: UserParam, @Res() res: Response) {
		const clients = this.wsGateway.clientsList
		const userExist = this.wsService.findClientByUser(clients, {name: param.login, avatar: ''})
		if (userExist) {
			res.status(HttpStatus.CONFLICT).send({message: 'User already exist'})
		}
		res.status(HttpStatus.OK).end()
	}
}
