import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common'

@Controller('/health')
export class HealthController {
	constructor() {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async healthCheck() {
		return 'OK'
	}
}
