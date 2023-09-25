import {FC, PropsWithChildren} from 'react'
import {Footer} from '../components/Footer/Footer.tsx'
import {Header} from '../components/Header/Header.tsx'
import {useAppSelector} from '../lib/redux/typedHooks.ts'

export const MainLayout: FC<PropsWithChildren> = ({children}) => {
	const user = useAppSelector(state => state.globalReducer.user)
	const showHeader = user ? <Header /> : null

	return (
		<div style={{display: 'flex', flexDirection: 'column', maxWidth: '1920px', height: '100%'}}>
			{showHeader}
			{children}
			{<Footer />}
		</div>
	)
}