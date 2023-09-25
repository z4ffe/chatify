import {apiInstance} from '../lib/apiInstance.ts'

class UserService {
	async checkUser(login: string) {
		try {
			const response = await apiInstance.get(`/user/${login}`)
			return response.status !== 200
		} catch (error) {
			return true
		}
	}
}

export const userService = new UserService()