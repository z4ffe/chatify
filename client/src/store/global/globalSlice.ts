import {createSlice} from '@reduxjs/toolkit'
import {User} from '../../entities/user.ts'
import {EStatus} from '../../types/enum/status.ts'
import {readyStateHandler} from '../../utils/readyStateHandler.ts'

interface IGlobalSlice {
	user: User | null
	onlineUsers: number
	clientsList: User[]
	status: EStatus
	theme: 'light' | 'dark'
	language: 'en' | 'ru'
	session: boolean
	apiStatus: boolean
}

const initialState: IGlobalSlice = {
	user: null,
	onlineUsers: 0,
	clientsList: [],
	status: EStatus.connecting,
	theme: 'light',
	language: 'en',
	session: true,
	apiStatus: true,
}

const globalSlice = createSlice({
	name: 'global',
	initialState: initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = new User(action.payload.name, action.payload.avatar)
		},
		removeUser: (state) => {
			state.user = null
		},
		setClientsList: (state, action) => {
			state.clientsList = action.payload
		},
		changeNetworkStatus: (state, action) => {
			state.status = readyStateHandler(action.payload)
		},
		setOnlineUsers: (state, action) => {
			state.onlineUsers = action.payload
		},
		setSession: (state) => {
			state.session = !state.session
		},
		setApiStatus: (state, action) => {
			state.apiStatus = action.payload
		},
		resetState: () => initialState,
	},
})

export const globalReducer = globalSlice.reducer
export const globalActions = globalSlice.actions