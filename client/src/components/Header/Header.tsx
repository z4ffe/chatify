import {WechatOutlined} from '@ant-design/icons'
import Title from 'antd/es/typography/Title'
import {CONSTANTS} from '../../constants/constants.ts'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import {greetingHandler} from '../../utils/greetingHandler.ts'
import styles from './header.module.scss'

export const Header = () => {
	const {user, onlineUsers, status} = useAppSelector(state => state.globalReducer)

	return (
		<div className={styles.headerWrapper}>
			<div className={styles.headerWrapper__filter}>
				<div className={styles.logoContainer}>
					<WechatOutlined className={styles.logoIcon} />
					<Title className={styles.headerTitle}>{CONSTANTS.TITLE.toUpperCase()}</Title>
				</div>
				<div className={styles.statusContainer}>
					<p>{greetingHandler()}: {user}</p>
					<p>Users in chat: {onlineUsers}</p>
					<p>Status: {status}</p>
				</div>
			</div>
		</div>
	)
}