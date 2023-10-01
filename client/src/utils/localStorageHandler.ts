import {message} from 'antd'
import {CONSTANTS} from '../constants/constants.ts'
import {User} from '../entities/user.ts'
import {userService} from '../services/userService.ts'
import {globalActions} from '../store/global/globalSlice.ts'
import store from '../store/store.ts'
import {EStatus} from '../types/enum/status.ts'

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
		if (reduxStore.getState().globalReducer.status === EStatus.connected) {
			void message.info(CONSTANTS.LOGGED_OUT_MSG)
		} else {
			void message.error({type: 'error', content: CONSTANTS.USER_EXIST_ERROR, duration: 5})
		}
	}
}