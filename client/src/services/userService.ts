import {AxiosError} from 'axios'
import {User} from '../entities/user.ts'
import {apiInstance} from '../lib/axios/apiInstance.ts'
import {globalActions} from '../store/global/globalSlice.ts'
import store from '../store/store.ts'

class UserService {
	async checkUser({name}: User) {
		try {
			const response = await apiInstance.get(`/user/${name}`)
			return response.status !== 200
		} catch (error) {
			if ((error instanceof AxiosError) && error.response?.status === 409) {
				return true
			}
			store.dispatch(globalActions.setApiStatus(false))
			throw error
		}
	}
}

export const userService = new UserService()