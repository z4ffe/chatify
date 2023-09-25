import {Module} from '@nestjs/common'
import {WsModule} from './ws/ws.module'
import { HealthModule } from './health/health.module';

@Module({
	imports: [WsModule, HealthModule],
})
export class AppModule {
}
