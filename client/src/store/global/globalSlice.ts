import {createSlice} from '@reduxjs/toolkit'

const globalSlice = createSlice({
	name: 'global',
	initialState: {},
	reducers: {},
})

export default globalSlice.reducer
export const globalActions = globalSlice.actions