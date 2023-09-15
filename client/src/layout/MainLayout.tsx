import {Space} from 'antd'
import {FC, PropsWithChildren} from 'react'
import {Header} from '../components/Header.tsx'
import {useAppSelector} from '../lib/redux/typedHooks.ts'

export const MainLayout: FC<PropsWithChildren> = ({children}) => {
	const user = useAppSelector(state => state.globalReducer.user)

	return (
		<Space style={{display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1920px'}}>
			{user ? <Header /> : null}
			{children}
		</Space>
	)
}