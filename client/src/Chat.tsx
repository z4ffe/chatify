import {Button, Space, Typography} from 'antd'
import Title from 'antd/es/typography/Title'
import {useEffect, useState} from 'react'
import {EStatus} from './types/enum/Status.ts'
import {readyStateHandler} from './utils/readyStateHandler.ts'

const WS_URL = 'ws://localhost:5005/'

export const Chat = () => {
	const [socket, setSocket] = useState<WebSocket | null>(null)
	const [status, setStatus] = useState<EStatus>(EStatus.connecting)
	const [chatMessage, setChatMessage] = useState<string>('')
	const [readyState, setReadyState] = useState<number>(0)

	useEffect(() => {
		const ws = new WebSocket(WS_URL)
		setSocket(ws)
		return () => {
			if (socket) {
				socket.close()
			}
		}
	}, [])

	useEffect(() => {
		setStatus(readyStateHandler(readyState))
	}, [readyState])


	useEffect(() => {
		if (socket) {
			socket.onopen = () => {
				console.log('open')
				socket.onmessage = (message) => {
					console.log('message')
					setChatMessage(prevMsg => prevMsg + ' ' + message.data)
				}
				setReadyState(socket.OPEN)
			}
			socket.onclose = () => {
				console.log('closed')
				setReadyState(socket.CLOSED)
			}
		}
	}, [socket])

	return (
		<Space>
			<Title>Chat status: {status}</Title>
			<Typography>{chatMessage}</Typography>
			<Button onClick={() => socket!.send('asd')}>send</Button>
		</Space>
	)
}