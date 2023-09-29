import {EmojiClickData} from 'emoji-picker-react'
import {KeyboardEvent, SyntheticEvent, useEffect, useState} from 'react'
import {ChatTable} from '../../components/ChatTable/ChatTable.tsx'
import {UsersList} from '../../components/UsersList/UsersList.tsx'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import {WsService} from '../../services/wsService.ts'
import {InputPanel} from '../../shared/InputPanel/InputPanel.tsx'
import {WsContract} from '../../types/contracts/wsContract.ts'
import styles from './chat.module.scss'

export const Chat = () => {
	const {user} = useAppSelector(state => state.globalReducer)
	const [wsInstance, setWsInstance] = useState<WsService | null>(null)
	const [chatMessages, setChatMessages] = useState<WsContract[]>([])
	const [input, setInput] = useState<string>('')

	useEffect(() => {
		const wsService = new WsService()
		wsService.openConnection(handleMessage, user)
		setWsInstance(wsService)
		document.title = `Chatify: ${user}`
		return () => {
			document.title = `Chatify`
			wsService.closeConnection()
		}
	}, [])

	const handleSendMsg = () => {
		if (input.length) {
			wsInstance?.sendMessage(user, input)
			setInput('')
		}
	}

	const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSendMsg()
		}
	}

	const handleMessage = (data: WsContract) => {
		setChatMessages(prevState => [...prevState, data])
	}

	const handleInput = (event: SyntheticEvent<HTMLInputElement>) => {
		setInput(event.currentTarget.value)
	}

	const handleEmoji = (event: EmojiClickData) => {
		setInput(prevState => prevState + ' ' + event.emoji + '')
	}

	return (
		<div className={styles.chat}>
			<div className={styles.chatTableWrapper}>
				<ChatTable chatMessages={chatMessages} />
				<UsersList />
			</div>
			<InputPanel input={input} handleInput={handleInput} handleEnterKey={handleEnterKey} handleEmoji={handleEmoji} handleSendMsg={handleSendMsg} />
		</div>
	)
}