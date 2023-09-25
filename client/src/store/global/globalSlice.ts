import {createSlice} from '@reduxjs/toolkit'
import {EStatus} from '../../types/enum/status.ts'
import {readyStateHandler} from '../../utils/readyStateHandler.ts'

interface IGlobalSlice {
	user: string
	onlineUsers: number
	status: EStatus
	theme: 'light' | 'dark'
	language: 'en' | 'ru'
	error: '' | 'exist'
}

const initialState: IGlobalSlice = {
	user: '',
	onlineUsers: 0,
	status: EStatus.connecting,
	theme: 'light',
	language: 'en',
	error: '',
}

const globalSlice = createSlice({
	name: 'global',
	initialState: initialState,
	reducers: {
		setUserName: (state, action) => {
			state.user = action.payload
		},
		changeNetworkStatus: (state, action) => {
			if (action.payload === WebSocket.CLOSED) {
				state.user = ''
			} else {
				state.status = readyStateHandler(action.payload)
			}
		},
		setOnlineUsers: (state, action) => {
			state.onlineUsers = action.payload
		},
		resetState: () => initialState,
	},
})

export const globalReducer = globalSlice.reducer
export const globalActions = globalSlice.actions