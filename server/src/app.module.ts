import {Module} from '@nestjs/common'
import { WsModule } from './ws/ws.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [WsModule, UserModule],
})
export class AppModule {
}
