import {FC, useEffect, useRef} from 'react'
import {CONSTANTS} from '../../constants/constants.ts'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import {ChatNotification} from '../../shared/ChatNotification/ChatNotification.tsx'
import {MessageBlock} from '../../shared/MessageBlock/MessageBlock.tsx'
import {MessageStruct} from '../../types/contracts/messageStruct.ts'
import {scrollToBottom} from '../../utils/scrollToBottom.ts'
import styles from './chatTable.module.scss'

interface Props {
	chatMessages: MessageStruct[]
}

export const ChatTable: FC<Props> = ({chatMessages}) => {
	const user = useAppSelector(state => state.globalReducer.user)
	const scrollAnchorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollToBottom(scrollAnchorRef)
	}, [chatMessages])

	return (
		<div className={styles.container}>
			<ChatNotification text={CONSTANTS.WELCOME_MESSAGE(user!.name)} />
			{user && chatMessages.map((message, idx) => {
				if (message.data.user.name !== user.name && message.event === 'message' && message.data.message && message.data.date) {
					return (<MessageBlock key={idx} type={'out'} text={message.data.message} user={message.data.user} date={message.data.date} />)
				} else if (message.data.user.name === user.name && message.event === 'message' && message.data.message && message.data.date) {
					return (<MessageBlock key={idx} type={'in'} text={message.data.message} user={message.data.user} date={message.data.date} />)
				} else if (message.event === 'userIn') {
					return (<ChatNotification text={`${message.data.user.name} join chat!`} />)
				} else if (message.event === 'userOut') {
					return (<ChatNotification text={`${message.data.user.name} leave chat`} />)
				}
			})}
			<div ref={scrollAnchorRef}></div>
		</div>
	)
}
