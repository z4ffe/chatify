import Avatar from 'antd/es/avatar/avatar'
import {FC} from 'react'
import styles from './userBox.module.scss'

interface Props {
	user: string
	src: string
}

export const UserBox: FC<Props> = ({user, src}) => {
	return (
		<div className={styles.userBox}>
			<Avatar src={src} size='small' />
			<p>{user}</p>
		</div>
	)
}