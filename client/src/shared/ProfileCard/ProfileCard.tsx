import {CheckCircleOutlined, LoadingOutlined, LogoutOutlined, TeamOutlined, WarningOutlined} from '@ant-design/icons'
import {Badge, Card, Tooltip} from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import Meta from 'antd/es/card/Meta'
import {FC, ReactNode, useContext} from 'react'
import {UsersListContext} from '../../context/usersListContext.tsx'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import {EStatus} from '../../types/enum/status.ts'
import {greetingHandler} from '../../utils/greetingHandler.ts'
import {LocalStorageHandler} from '../../utils/localStorageHandler.ts'


export const ProfileCard: FC = () => {
	const {user, onlineUsers, status} = useAppSelector(state => state.globalReducer)
	const statusIcon = (): ReactNode => {
		switch (status) {
			case EStatus.connected:
				return <CheckCircleOutlined style={{color: 'green', fontSize: 18}} />
			case EStatus.connecting:
				return <LoadingOutlined style={{color: 'orange', fontSize: 18}} />
			case EStatus.disconnected:
				return <WarningOutlined style={{color: 'red', fontSize: 18}} />
		}
	}
	const {handleShowList} = useContext(UsersListContext)

	return (
		user && <Card
			size={'small'}
			style={{width: 300, borderRadius: 5}}
			actions={[
				<Tooltip title={status} placement='bottom'>
					{statusIcon()}
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
				avatar={<Avatar src={user.avatar} />}
				title={user.name}
				description={`${greetingHandler()}`}
			/>
		</Card>
	)
}