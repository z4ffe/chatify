import Avatar from 'antd/es/avatar/avatar'
import {FC} from 'react'
import avatar1 from '../../assets/images/avatars/avatar1.png'
import styles from './messageBlock.module.scss'

interface Props {
	type: 'in' | 'out'
	text: string
	user?: string
	date: string
}

export const MessageBlock: FC<Props> = ({type, text, user, date}) => {
	return (
		<div className={type === 'in' ? styles.messageContainerOut : styles.messageContainerIn}>
			<div className={styles.avatarWrapper}>
				<Avatar size='large' src={avatar1} />
			</div>
			<div className={styles.messageWrapper}>
				{user ? <p className={styles.user}>{user}</p> : null}
				<div className={styles.messageBlock}>
					<p className={styles.messageText}>{text}</p>
				</div>
				<p className={styles.date}>{new Date(date).toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit', hour12: false})}</p>
			</div>
		</div>
	)
}