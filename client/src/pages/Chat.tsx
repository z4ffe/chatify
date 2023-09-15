import {Button, Input, Space} from 'antd'
import {SyntheticEvent, useEffect, useState} from 'react'
import {ChatTable} from '../components/ChatTable.tsx'
import {CONSTANTS} from '../constants/constants.ts'
import {useAppDispatch, useAppSelector} from '../lib/redux/typedHooks.ts'
import {globalActions} from '../store/global/globalSlice.ts'
import {readyStateHandler} from '../utils/readyStateHandler.ts'

export const Chat = () => {
	const dispatch = useAppDispatch()
	const {user} = useAppSelector(state => state.globalReducer)
	const [socket, setSocket] = useState<WebSocket | null>(null)
	const [chatMessages, setChatMessages] = useState<IWsMessage[]>([])
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
		const status = readyStateHandler(readyState)
		dispatch(globalActions.changeNetworkStatus(status))
	}, [readyState])


	useEffect(() => {
		if (socket) {
			socket.onopen = () => {
				socket.onmessage = (message) => {
					const parsedResponse: IWsMessage = JSON.parse(message.data)
					setChatMessages(prevState => [...prevState, parsedResponse])
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
			const json = JSON.stringify({user, message: input})
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