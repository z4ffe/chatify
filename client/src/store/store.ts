import {configureStore} from '@reduxjs/toolkit'
import globalSlice from './global/globalSlice.ts'

const store = configureStore({
	reducer: {
		globalReducer: globalSlice,
	},
})

export default store