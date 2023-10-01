import {WechatOutlined} from '@ant-design/icons'
import Title from 'antd/es/typography/Title'
import {AnimatePresence, motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import {LoginForm} from '../../components/LoginForm/LoginForm.tsx'
import {CONSTANTS} from '../../constants/constants.ts'
import {useAppDispatch, useAppSelector} from '../../lib/redux/typedHooks.ts'
import {healthService} from '../../services/healthService.ts'
import {ApiDownError} from '../../shared/ApiDownError/ApiDownError.tsx'
import {SessionSwitch} from '../../shared/SessionSwtich/SessionSwitch.tsx'
import {globalActions} from '../../store/global/globalSlice.ts'
import styles from './login.module.scss'
import {loginAnimation} from './loginAnimation.ts'

export const Login = () => {
	const apiStatus = useAppSelector(state => state.globalReducer.apiStatus)
	const dispatch = useAppDispatch()
	const [apiErrorLoading, setApiErrorLoading] = useState(false)

	const handleApiStatus = async () => {
		setApiErrorLoading(true)
		const response = await healthService.checkApi()
		dispatch(globalActions.setApiStatus(response))
		setApiErrorLoading(false)
	}

	useEffect(() => {
		void handleApiStatus()
	}, [])

	return (
		<motion.div className={styles.loginWrapper} {...loginAnimation}>
			<div className={styles.loginHeader}>
				<div className={styles.headerWrapper}>
					<WechatOutlined className={styles.headerIcon} />
					<Title className={styles.headerTitle}>{CONSTANTS.TITLE.toUpperCase()}</Title>
				</div>
			</div>
			<AnimatePresence mode='wait'>
				{apiStatus ? <LoginForm /> : <ApiDownError handleApiStatus={handleApiStatus} apiErrorLoading={apiErrorLoading} />}
			</AnimatePresence>
			<div className={styles.footer}>
				<SessionSwitch />
			</div>
		</motion.div>
	)
}

