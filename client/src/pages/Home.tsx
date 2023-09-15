import {Button, Input, Space} from 'antd'
import Title from 'antd/es/typography/Title'
import {SyntheticEvent, useEffect, useState} from 'react'
import {ChatTable} from '../components/ChatTable.tsx'
import {EStatus} from '../types/enum/Status.ts'
import {readyStateHandler} from '../utils/readyStateHandler.ts'

const WS_URL = 'ws://localhost:5005/'

export const Home = () => {
	const [socket, setSocket] = useState<WebSocket | null>(null)
	const [status, setStatus] = useState<EStatus>(EStatus.connecting)
	const [chatMessages, setChatMessages] = useState<IWsMessage[]>([])
	const [readyState, setReadyState] = useState<number>(0)
	const [input, setInput] = useState<string>('')
	const [user, setUser] = useState<string>('Paul')

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
					const parsedResponse: IWsMessage = JSON.parse(message.data)
					setChatMessages(prevState => [...prevState, parsedResponse])
				}
				setReadyState(socket.OPEN)
			}
			socket.onclose = () => {
				console.log('closed')
				setReadyState(socket.CLOSED)
			}
		}
	}, [socket])

	const handleInput = (event: SyntheticEvent<HTMLInputElement>) => {
		const str = event.currentTarget.value
		setInput(str)
	}

	const handleSendMsg = () => {
		const json = JSON.stringify({user: user, message: input})
		socket?.send(json)
	}

	return (
		<Space direction='vertical'>
			<Title>Chat status: {status}</Title>
			<ChatTable chatMessages={chatMessages} />
			<Input onChange={handleInput} />
			<Button onClick={handleSendMsg}>send</Button>
		</Space>
	)
}