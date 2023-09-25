import {FC, useEffect, useRef} from 'react'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import {WSMsgData} from '../../types/contracts/wsMessage.ts'
import {MessageBlock} from '../MessageBlock/MessageBlock.tsx'
import styles from './chatTable.module.scss'

interface Props {
	chatMessages: WSMsgData[]
}

export const ChatTable: FC<Props> = ({chatMessages}) => {
	const user = useAppSelector(state => state.globalReducer.user)
	const scrollAnchorRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		scrollAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
	}

	useEffect(() => {
		scrollToBottom()
	}, [chatMessages])

	if (!chatMessages.length) {
		return (<div>Type Something</div>)
	}

	return (
		<div className={styles.container}>
			<p className={styles.title}>Welcome to Chatify, {user}!</p>
			{chatMessages.map((message, idx) => {
				if (message.data.user !== user) {
					return (<MessageBlock key={idx} type={'out'} text={message.data.message} user={message.data.user} date={message.data.date} />)
				} else if (message.data.user === user) {
					return (<MessageBlock key={idx} type={'in'} text={message.data.message} date={message.data.date} />)
				}
			})}
			<div ref={scrollAnchorRef}></div>
		</div>
	)
}
