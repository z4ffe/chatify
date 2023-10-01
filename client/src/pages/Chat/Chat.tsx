import {EmojiClickData} from 'emoji-picker-react'
import {AnimatePresence} from 'framer-motion'
import {KeyboardEvent, SyntheticEvent, useEffect, useState} from 'react'
import {useMediaQuery} from 'react-responsive'
import {ChatTable} from '../../components/ChatTable/ChatTable.tsx'
import {UsersList} from '../../components/UsersList/UsersList.tsx'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import {WsService} from '../../services/wsService.ts'
import {InputPanel} from '../../shared/InputPanel/InputPanel.tsx'
import {MessageStruct} from '../../types/contracts/messageStruct.ts'
import styles from './chat.module.scss'

export const Chat = () => {
	const {user} = useAppSelector(state => state.globalReducer)
	const [wsInstance, setWsInstance] = useState<WsService | null>(null)
	const [chatMessages, setChatMessages] = useState<MessageStruct[]>([])
	const [input, setInput] = useState<string>('')
	const isMobile = useMediaQuery({query: '(max-width: 550px)'})

	useEffect(() => {
		let wsService: WsService
		if (user) {
			wsService = new WsService()
			wsService.openConnection(handleMessage, user)
			setWsInstance(wsService)
			document.title = `Chatify: ${user.name}`
		}
		return () => {
			document.title = `Chatify`
			wsService.closeConnection()
		}
	}, [])

	const handleSendMsg = () => {
		if (input.length && user && wsInstance) {
			wsInstance.sendMessage(user, input)
			setInput('')
		}
	}

	const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSendMsg()
		}
	}

	const handleMessage = (data: MessageStruct) => {
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
			<AnimatePresence>
				<div className={styles.chatTableWrapper}>
					<ChatTable chatMessages={chatMessages} />
					{isMobile ? null : <UsersList />}
				</div>
			</AnimatePresence>
			<InputPanel input={input} handleInput={handleInput} handleEnterKey={handleEnterKey} handleEmoji={handleEmoji} handleSendMsg={handleSendMsg} />
		</div>
	)
}