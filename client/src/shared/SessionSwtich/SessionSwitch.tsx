import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {Switch} from 'antd'
import {FC} from 'react'

interface Props {
	handleSession: () => void
}

export const SessionSwitch: FC<Props> = ({handleSession}) => {
	return (
		<>
			<p style={{fontSize: '13px'}}>Save session</p>
			<Switch
				size='small'
				style={{width: '35px', background: '#4560F7'}}
				checkedChildren={<CheckOutlined />}
				unCheckedChildren={<CloseOutlined />}
				defaultChecked
				onChange={handleSession}
			/>
		</>
	)
}