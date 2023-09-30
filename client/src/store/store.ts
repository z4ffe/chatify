import {configureStore} from '@reduxjs/toolkit'
import {globalReducer} from './global/globalSlice.ts'

const store = configureStore({
	reducer: {
		globalReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredPaths: ['globalReducer'],
				ignoredActions: ['global/setUser'],
			},
		}),
})

export default store
export type RootState = ReturnType<typeof store.getState>