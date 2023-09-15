import {configureStore} from '@reduxjs/toolkit'
import {globalReducer} from './global/globalSlice.ts'

const store = configureStore({
	reducer: {
		globalReducer,
	},
})

export default store
export type RootState = ReturnType<typeof store.getState>