import {Button, Input, Space} from 'antd'
import {SyntheticEvent, useEffect, useState} from 'react'
import {ChatTable} from '../components/ChatTable.tsx'
import {CONSTANTS} from '../constants/constants.ts'
import {wsEvents} from '../constants/wsEvents.ts'
import {useAppDispatch, useAppSelector} from '../lib/redux/typedHooks.ts'
import {globalActions} from '../store/global/globalSlice.ts'
import {WSMsgData, WSResponse} from '../types/contracts/wsMessage.ts'

export const Chat = () => {
	const dispatch = useAppDispatch()
	const {user} = useAppSelector(state => state.globalReducer)
	const [socket, setSocket] = useState<WebSocket | null>(null)
	const [chatMessages, setChatMessages] = useState<WSResponse[]>([])
	const [readyState, setReadyState] = useState<number>(0)
	const [input, setInput] = useState<string>('')

	useEffect(() => {
		const ws = new WebSocket(CONSTANTS.WS_URL)
		setSocket(ws)
		return () => {
			if (socket) {
				socket.close()
			}
		}
	}, [])


	useEffect(() => {
		if (socket) {
			socket.onopen = () => {
				socket.onmessage = (message) => {
					const parsedResponse: WSMsgData = JSON.parse(message.data)
					if (parsedResponse.event === 'onlineUsers') {
						console.log(parsedResponse)
						dispatch(globalActions.setOnlineUsers(parsedResponse.data.onlineUsers))
					} else {
						setChatMessages(prevState => [...prevState, parsedResponse])
					}
				}
				setReadyState(socket.OPEN)
			}
			socket.onclose = () => {
				setReadyState(socket.CLOSED)
			}
		}
	}, [socket])

	const handleInput = (event: SyntheticEvent<HTMLInputElement>) => {
		const str = event.currentTarget.value
		setInput(str)
	}

	const handleSendMsg = () => {
		if (input.length) {
			const message = {
				event: wsEvents.message,
				data: {
					user,
					message: input,
				},
			}
			const json = JSON.stringify(message)
			socket?.send(json)
			setInput('')
		}
	}

	return (
		<Space direction='vertical'>
			<ChatTable chatMessages={chatMessages} />
			<Input onChange={handleInput} value={input} />
			<Button onClick={handleSendMsg}>send</Button>
		</Space>
	)
}