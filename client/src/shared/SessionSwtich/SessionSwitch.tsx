import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {Switch} from 'antd'
import {useAppDispatch} from '../../lib/redux/typedHooks.ts'
import {globalActions} from '../../store/global/globalSlice.ts'

export const SessionSwitch = () => {
	const dispatch = useAppDispatch()

	return (
		<>
			<p style={{fontSize: '13px'}}>Save session</p>
			<Switch
				size='small'
				style={{width: '35px', background: '#4560F7'}}
				checkedChildren={<CheckOutlined />}
				unCheckedChildren={<CloseOutlined />}
				defaultChecked
				onChange={() => dispatch(globalActions.setSession())}
			/>
		</>
	)
}