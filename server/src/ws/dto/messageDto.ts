import {IsDate, IsNotEmpty, IsString} from 'class-validator'

export class DataDto {
	@IsNotEmpty()
	@IsString()
	user: string

	@IsNotEmpty()
	@IsString()
	message: string

	@IsDate()
	date: Date
}

export class MessageDto {
	@IsNotEmpty()
	@IsString()
	event: string

	data: DataDto
}