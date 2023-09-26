import {NestFactory} from '@nestjs/core'
import {WsAdapter} from '@nestjs/platform-ws'
import {AppModule} from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['warn', 'debug', 'error', 'fatal'],
	})
	app.useWebSocketAdapter(new WsAdapter(app))
	app.enableCors()
	app.setGlobalPrefix('/api')
	await app.listen(5005)
}

bootstrap()
