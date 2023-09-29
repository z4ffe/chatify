import {CheckCircleOutlined, LogoutOutlined, TeamOutlined} from '@ant-design/icons'
import {Badge, Card, Tooltip} from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import Meta from 'antd/es/card/Meta'
import {FC, useContext} from 'react'
import {UsersListContext} from '../../context/usersListContext.tsx'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import {greetingHandler} from '../../utils/greetingHandler.ts'
import {LocalStorageHandler} from '../../utils/localStorageHandler.ts'


export const ProfileCard: FC = () => {
	const {user, onlineUsers, status} = useAppSelector(state => state.globalReducer)
	const {handleShowList} = useContext(UsersListContext)

	return (
		<Card
			size={'small'}
			style={{width: 300, borderRadius: 5}}
			actions={[
				<Tooltip title={status} placement='bottom'>
					<CheckCircleOutlined style={{color: 'green', fontSize: 18}} />
				</Tooltip>,
				<Tooltip title='Users in chat' placement='bottom'>
					<Badge count={onlineUsers} size='small'>
						<TeamOutlined style={{fontSize: 18}} onClick={handleShowList} />
					</Badge>
				</Tooltip>,
				<Tooltip title='Sign out' placement='bottom'>
					<LogoutOutlined onClick={LocalStorageHandler.removeUser} style={{fontSize: 18}} />
				</Tooltip>,
			]}
		>
			<Meta
				avatar={<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />}
				title={user}
				description={`${greetingHandler()}`}
			/>
		</Card>
	)
}