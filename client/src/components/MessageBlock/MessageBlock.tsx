import {FC} from 'react'
import styles from './messageBlock.module.scss'

interface Props {
	type: 'in' | 'out'
	text: string
}

export const MessageBlock: FC<Props> = ({type, text}) => {
	return (
		<div className={type === 'in' ? styles.messageBlockInc : styles.messageBlockOut}>
			<p className={styles.messageText}>{text}</p>
		</div>
	)
}