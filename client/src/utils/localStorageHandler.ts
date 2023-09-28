import {userService} from '../service/userService.ts'
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
		reduxStore.dispatch(globalActions.setUserName(localUser))
	}

	public static getUser() {
		return localStorage.getItem('login')
	}

	public static addUser(user: string) {
		return localStorage.setItem('login', user)
	}

	public static removeUser() {
		return localStorage.removeItem('login')
	}
}