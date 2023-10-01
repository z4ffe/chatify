export class User {
	readonly name: string
	readonly avatar: string
	readonly agent: string

	constructor(name: string, avatar: string) {
		this.name = name.trim()
		this.avatar = avatar
		this.agent = navigator.userAgent
	}
}