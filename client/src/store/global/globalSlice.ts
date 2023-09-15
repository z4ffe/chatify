import {createSlice} from '@reduxjs/toolkit'
import {EStatus} from '../../types/enum/Status.ts'

interface IGlobalSlice {
	user: string
	activeUsers: number
	status: EStatus
}

const initialState: IGlobalSlice = {
	user: '',
	activeUsers: 0,
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
			state.status = action.payload
		},
	},
})

export const globalReducer = globalSlice.reducer
export const globalActions = globalSlice.actions