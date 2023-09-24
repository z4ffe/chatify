import {createSlice} from '@reduxjs/toolkit'
import {EStatus} from '../../types/enum/Status.ts'
import {readyStateHandler} from '../../utils/readyStateHandler.ts'

interface IGlobalSlice {
	user: string
	onlineUsers: number
	status: EStatus
}

const initialState: IGlobalSlice = {
	user: '',
	onlineUsers: 0,
	status: EStatus.connecting,
}

const globalSlice = createSlice({
	name: 'global',
	initialState: initialState,
	reducers: {
		setUserName: (state, action) => {
			state.user = action.payload
		},
		changeNetworkStatus: (state, action) => {
			state.status = readyStateHandler(action.payload)
		},
		setOnlineUsers: (state, action) => {
			state.onlineUsers = action.payload
		},
		resetState: () => initialState,
	},
})

export const globalReducer = globalSlice.reducer
export const globalActions = globalSlice.actions