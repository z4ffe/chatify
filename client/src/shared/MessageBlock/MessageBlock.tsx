import Avatar from 'antd/es/avatar/avatar'
import {FC} from 'react'
import {User} from '../../entities/user.ts'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import styles from './messageBlock.module.scss'

interface Props {
	type: 'in' | 'out'
	text: string
	user: User
	date: string
}

export const MessageBlock: FC<Props> = ({type, text, user, date}) => {
	const userName = useAppSelector(state => state.globalReducer.user?.name)

	return (
		<div className={type === 'in' ? styles.messageContainerOut : styles.messageContainerIn}>
			<div className={styles.avatarWrapper}>
				<Avatar size='large' src={user?.avatar} />
			</div>
			<div className={styles.messageWrapper}>
				{user.name !== userName ? <p className={styles.user}>{user.name}</p> : null}
				<div className={styles.messageBlock}>
					<p className={styles.messageText}>{text}</p>
				</div>
				<p className={styles.date}>{new Date(date).toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit', hour12: false})}</p>
			</div>
		</div>
	)
}