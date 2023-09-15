import {Table} from 'antd'
import {FC} from 'react'

interface Props {
	chatMessages: IWsMessage[]
}

export const ChatTable: FC<Props> = ({chatMessages}) => {
	const columns = [
		{
			title: 'User',
			dataIndex: 'user',
			key: 'user',
		},
		{
			title: 'Message',
			dataIndex: 'message',
			key: 'message',
		},
		{
			title: 'Time',
			dataIndex: 'date',
			key: 'date',
		}]

	return (
		<Table columns={columns} dataSource={chatMessages} pagination={false} />
	)
}