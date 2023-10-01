import {Avatar} from 'antd'
import {FC} from 'react'
import {userAgentType} from '../../utils/userAgentType.tsx'
import styles from './userBox.module.scss'

interface Props {
	user: string
	src: string
}

export const UserBox: FC<Props> = ({user, src}) => {
	return (
		<div className={styles.userBox}>
			<div className={styles.wrapper}>
				<Avatar src={src} size='small' />
				<p>{user}</p>
			</div>
			{userAgentType()}
		</div>
	)
}