import {Space, Typography} from 'antd'
import Title from 'antd/es/typography/Title'
import {useEffect, useState} from 'react'
import {EStatus} from './types/enum/Status.ts'
import {readyStateHandler} from './utils/readyStateHandler.ts'

export const Chat = () => {
	const ws = new WebSocket('ws://localhost:5005')
	const [status, setStatus] = useState<EStatus>(EStatus.connecting)
	const [chatMessage, setChatMessage] = useState<string>('')
	const [readyState, setReadyState] = useState<number>(0)

	useEffect(() => {
		setStatus(readyStateHandler(readyState))
	}, [readyState])

	ws.onopen = () => setReadyState(ws.OPEN)
	ws.onclose = () => setReadyState(ws.CLOSED)

	ws.onmessage = (message) => {
		setChatMessage(prevMsg => prevMsg + ' ' + message.data)
	}

	return (
		<Space>
			<Title>Chat status: {status}</Title>
			<Typography>{chatMessage}</Typography>
		</Space>
	)
}