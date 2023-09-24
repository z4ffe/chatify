import {Button, Input, Space} from 'antd'
import {SyntheticEvent, useEffect, useState} from 'react'
import {ChatTable} from '../components/ChatTable.tsx'
import {CONSTANTS} from '../constants/constants.ts'
import {useAppSelector} from '../lib/redux/typedHooks.ts'
import {WsService} from '../service/wsService.ts'
import {WSMsgData} from '../types/contracts/wsMessage.ts'

export const Chat = () => {
	const {user} = useAppSelector(state => state.globalReducer)
	const [wsInstance, setWsInstance] = useState<WsService | null>(null)
	const [chatMessages, setChatMessages] = useState<WSMsgData[]>([])
	const [input, setInput] = useState<string>('')

	useEffect(() => {
		const ws = new WebSocket(CONSTANTS.WS_URL)
		const wsInst = new WsService(ws)
		wsInst.openConnection(setChatMessages)
		setWsInstance(wsInst)
		document.title = `Chatify: ${user}`
		return wsInst.closeConnection()
	}, [])


	const handleInput = (event: SyntheticEvent<HTMLInputElement>) => {
		setInput(event.currentTarget.value)
	}

	const handleSendMsg = () => {
		wsInstance?.sendMessage(user, input)
		setInput('')
	}

	return (
		<Space direction='vertical'>
			<ChatTable chatMessages={chatMessages} />
			<Input onChange={handleInput} value={input} />
			<Button onClick={handleSendMsg}>send</Button>
		</Space>
	)
}