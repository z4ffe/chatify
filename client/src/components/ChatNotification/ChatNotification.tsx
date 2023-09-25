import {FC} from 'react'
import styles from './chatNotification.module.scss'

interface Props {
	text: string
}

export const ChatNotification: FC<Props> = ({text}) => {
	return (
		<div className={styles.wrapper}>
			<p className={styles.text}>{text}</p>
		</div>
	)
}