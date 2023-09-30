import {message} from 'antd'
import {User} from '../entities/user.ts'
import {userService} from '../services/userService.ts'
import {globalActions} from '../store/global/globalSlice.ts'
import store from '../store/store.ts'

export class LocalStorageHandler {
	public static async checkUserStatus() {
		const reduxStore = store
		const localUser = this.getUser()
		if (!localUser) {
			return false
		}
		const remoteUser = await userService.checkUser(localUser)
		if (remoteUser) {
			this.removeUser()
			return false
		}
		reduxStore.dispatch(globalActions.setUser(localUser))
	}

	public static getUser() {
		const user = localStorage.getItem('user')
		if (user) {
			return JSON.parse(user) as User
		}
		return null
	}

	public static addUser(user: User) {
		return localStorage.setItem('user', JSON.stringify(user))
	}

	public static removeUser() {
		const reduxStore = store
		localStorage.removeItem('user')
		reduxStore.dispatch(globalActions.removeUser())
		void message.info('You have successfully logged out')
	}
}