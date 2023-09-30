export class User {
	readonly name: string
	readonly avatar: string

	constructor(name: string, avatar: string) {
		this.name = name
		this.avatar = avatar
	}
}