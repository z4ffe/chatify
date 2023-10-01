import {Avatar} from 'antd'
import {FC} from 'react'
import {userAgentType} from '../../utils/userAgentType.tsx'
import styles from './userBox.module.scss'

interface Props {
	user: string
	src: string
	agent: string
}

export const UserBox: FC<Props> = ({user, src, agent}) => {
	return (
		<div className={styles.userBox}>
			<div className={styles.wrapper}>
				<Avatar src={src} size='small' />
				<p>{user}</p>
			</div>
			{userAgentType(agent)}
		</div>
	)
}