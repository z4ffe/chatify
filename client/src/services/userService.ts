import {User} from '../entities/user.ts'
import {apiInstance} from '../lib/axios/apiInstance.ts'

class UserService {
	async checkUser({name}: User) {
		try {
			const response = await apiInstance.get(`/user/${name}`)
			return response.status !== 200
		} catch (error) {
			return true
		}
	}
}

export const userService = new UserService()