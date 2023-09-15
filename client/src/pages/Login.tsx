import {Space} from 'antd'
import {useForm} from 'react-hook-form'

export const Login = () => {
	const {register, handleSubmit, control, reset} = useForm()

	return (
		<Space>
			<h1>LoginPage</h1>
		</Space>
	)
}