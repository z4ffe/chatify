import {FC, PropsWithChildren} from 'react'
import {Header} from '../components/Header.tsx'
import {useAppSelector} from '../lib/redux/typedHooks.ts'

export const MainLayout: FC<PropsWithChildren> = ({children}) => {
	const user = useAppSelector(state => state.globalReducer.user)
	const showHeader = user ? <Header /> : null

	return (
		<div style={{display: 'flex', flexDirection: 'column', width: '80%', maxWidth: '1920px', height: '100%', margin: '0 auto'}}>
			{showHeader}
			{children}
		</div>
	)
}