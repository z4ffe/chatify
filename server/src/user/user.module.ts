import {Module} from '@nestjs/common'
import {WsGateway} from '../ws/ws.gateway'
import {WsService} from '../ws/ws.service'
import {UserController} from './user.controller'

@Module({
	controllers: [UserController],
	providers: [WsService, WsGateway],
})
export class UserModule {
}
