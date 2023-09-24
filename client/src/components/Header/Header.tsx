import {Space, Typography} from 'antd'
import Title from 'antd/es/typography/Title'
import {CONSTANTS} from '../../constants/constants.ts'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import {greetingHandler} from '../../utils/greetingHandler.ts'

export const Header = () => {
	const {user, onlineUsers, status} = useAppSelector(state => state.globalReducer)

	return (
		<div style={{
			display: 'flex', width: '100%', height: '150px',
			background: 'conic-gradient(from 202deg at 81.78% 23.22%, #4629F2 0deg, #13C6FF 125.62500357627869deg, #B94DFB 215.62499284744263deg, #FF53EE 294.3749928474426deg, #F3B960 360deg), #D9D9D9',
		}}>
			<div style={{display: 'flex', width: '100%', height: '100%', backdropFilter: 'blur(5px)'}}>
				<Title level={2}>{CONSTANTS.TITLE}</Title>
				<Space>
					<Space>
						<Typography>Active users: {onlineUsers}</Typography>
					</Space>
					<Space>
						<Typography>Network status: {status}</Typography>
					</Space>
					<Space>
						<Typography>{greetingHandler()}: {user}</Typography>
					</Space>
				</Space>
			</div>
		</div>
	)
}