import Title from 'antd/es/typography/Title'
import {AnimatePresence} from 'framer-motion'
import {Navigate, Route, Routes} from 'react-router-dom'
import {useAppSelector} from '../lib/redux/typedHooks.ts'
import {Chat} from '../pages/Chat/Chat.tsx'
import {Login} from '../pages/Login/Login.tsx'

export const Router = () => {
	const user = useAppSelector(state => state.globalReducer.user)

	return (
		<AnimatePresence>
			<Routes>
				<Route path='/' element={<Navigate to='/chat' />} />
				<Route path='/chat' element={user ? <Chat /> : <Navigate to='/login' />} index />
				<Route path='/login' element={!user ? <Login /> : <Navigate to='/chat' />} />
				<Route path='*' element={<Title>404 Not Found</Title>} />
			</Routes>
		</AnimatePresence>

	)
}