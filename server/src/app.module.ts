import {Module} from '@nestjs/common'
import {HealthModule} from './health/health.module'
import {WsModule} from './ws/ws.module'

@Module({
	imports: [WsModule, HealthModule],
})
export class AppModule {
}
