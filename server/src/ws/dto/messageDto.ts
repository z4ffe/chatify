import {IsDate, IsNotEmpty, IsString} from 'class-validator'
import {User} from '../entities/user'

export class DataDto {
	@IsNotEmpty()
	user?: User

	@IsNotEmpty()
	@IsString()
	message?: string

	@IsDate()
	date?: Date
}

export class MessageDto {
	@IsNotEmpty()
	@IsString()
	event: string

	data: DataDto
}