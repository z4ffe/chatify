import Avatar from 'antd/es/avatar/avatar'
import {FC} from 'react'
import styles from './userBox.module.scss'

interface Props {
	user: string
}

export const UserBox: FC<Props> = ({user}) => {
	return (
		<div className={styles.userBox}>
			<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' size='small' />
			<p>{user}</p>
		</div>
	)
}