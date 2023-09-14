import {Button, Space, Typography} from 'antd'
import Title from 'antd/es/typography/Title'
import {useEffect, useState} from 'react'
import {EStatus} from './types/enum/Status.ts'
import {readyStateHandler} from './utils/readyStateHandler.ts'

const WS_URL = 'wss://localhost:5005'

export const Chat = () => {
	const [socket, setSocket] = useState<WebSocket | null>(null)
	const [status, setStatus] = useState<EStatus>(EStatus.connecting)
	const [chatMessage, setChatMessage] = useState<string>('')
	const [readyState, setReadyState] = useState<number>(0)

	useEffect(() => {
		setStatus(readyStateHandler(readyState))
	}, [readyState])

	useEffect(() => {
		const ws = new WebSocket(WS_URL)
		setSocket(ws)
		if (socket) {
			socket.onopen = () => {
				socket.onmessage = (message) => {
					console.log('asd')
					setChatMessage(prevMsg => prevMsg + ' ' + message.data)
				}
				setReadyState(socket.OPEN)
			}
			ws.onclose = () => {
				console.log('closed')
				setReadyState(socket.CLOSED)
			}
		}

		return () => socket!.close()
	}, [])

	return (
		<Space>
			<Title>Chat status: {status}</Title>
			<Typography>{chatMessage}</Typography>
			<Button onClick={() => socket!.send('asd')}>send</Button>
		</Space>
	)
}