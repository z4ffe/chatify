import {Button, Input} from 'antd'
import {EmojiClickData} from 'emoji-picker-react'
import {KeyboardEvent, SyntheticEvent, useEffect, useState} from 'react'
import {ChatTable} from '../components/ChatTable/ChatTable.tsx'
import {EmojiComponent} from '../components/EmojiComponent/EmojiComponent.tsx'
import {useAppSelector} from '../lib/redux/typedHooks.ts'
import {WsService} from '../service/wsService.ts'
import {WsContract} from '../types/contracts/wsContract.ts'

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
			wsInstance?.closeConnection()
		}
	}, [])

	const handleSendMsg = () => {
		if (input.length > 0) {
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
		<div>
			<ChatTable chatMessages={chatMessages} />
			<div style={{display: 'flex', marginTop: '5px'}}>
				<Input autoFocus placeholder='Enter you message...' onChange={handleInput} value={input} onKeyDown={(e) => handleEnterKey(e)} />
				<EmojiComponent handleEmoji={handleEmoji} />
				<Button onClick={handleSendMsg}>SEND</Button>
			</div>
		</div>
	)
}