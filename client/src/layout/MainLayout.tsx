import {FC, PropsWithChildren} from 'react'
import {Footer} from '../components/Footer/Footer.tsx'
import {Header} from '../components/Header/Header.tsx'
import {useAppSelector} from '../lib/redux/typedHooks.ts'
import styles from './mainLayout.module.scss'

export const MainLayout: FC<PropsWithChildren> = ({children}) => {
	const user = useAppSelector(state => state.globalReducer.user)
	const showHeader = user ? <Header /> : null

	return (
		<div className={styles.layoutContainer}>
			{showHeader}
			{children}
			<Footer />
		</div>
	)
}