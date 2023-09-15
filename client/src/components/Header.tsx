import {Space, Typography} from 'antd'
import Title from 'antd/es/typography/Title'
import {CONSTANTS} from '../constants/constants.ts'
import {useAppSelector} from '../lib/redux/typedHooks.ts'
import {greetingHandler} from '../utils/greetingHandler.ts'

export const Header = () => {
	const {user, activeUsers, status} = useAppSelector(state => state.globalReducer)

	return (
		<Space style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
			<Title level={2}>{CONSTANTS.TITLE}</Title>
			<Space>
				<Space>
					<Typography>Active users: {activeUsers}</Typography>
				</Space>
				<Space>
					<Typography>Network status: {status}</Typography>
				</Space>
				<Space>
					<Typography>{greetingHandler()}: {user}</Typography>
				</Space>
			</Space>
		</Space>
	)
}