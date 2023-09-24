import {Button, Input} from 'antd'
import {SyntheticEvent, useEffect, useState} from 'react'
import {ChatTable} from '../components/ChatTable/ChatTable.tsx'
import {CONSTANTS} from '../constants/constants.ts'
import {useAppSelector} from '../lib/redux/typedHooks.ts'
import {WsService} from '../service/wsService.ts'
import {WSMsgData} from '../types/contracts/wsMessage.ts'

export const Chat = () => {
	const {user} = useAppSelector(state => state.globalReducer)
	const [wsInstance, setWsInstance] = useState<WsService | null>(null)
	const [chatMessages, setChatMessages] = useState<WSMsgData[]>([])
	const [input, setInput] = useState<string>('')

	console.log(chatMessages)

	useEffect(() => {
		const ws = new WebSocket(CONSTANTS.WS_URL)
		const wsService = new WsService(ws)
		wsService.openConnection(handleMessage)
		setWsInstance(wsService)
		document.title = `Chatify: ${user}`
		return () => {
			wsService.closeConnection()
		}
	}, [])


	const handleMessage = (data: WSMsgData) => {
		setChatMessages(prevState => [...prevState, data])
	}

	const handleInput = (event: SyntheticEvent<HTMLInputElement>) => {
		setInput(event.currentTarget.value)
	}

	const handleSendMsg = () => {
		wsInstance?.sendMessage(user, input)
		setInput('')
	}

	return (
		<div>
			<ChatTable chatMessages={chatMessages} />
			<Input autoFocus onChange={handleInput} value={input} />
			<Button onClick={handleSendMsg}>send</Button>
		</div>
	)
}