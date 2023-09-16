import {WechatOutlined} from '@ant-design/icons'
import {Button, Form, Input} from 'antd'
import Title from 'antd/es/typography/Title'
import {Controller, useForm} from 'react-hook-form'
import {CONSTANTS} from '../constants/constants.ts'
import {useAppDispatch} from '../lib/redux/typedHooks.ts'
import {globalActions} from '../store/global/globalSlice.ts'

type LoginForm = {
	userName: string
}

export const Login = () => {
	const dispatch = useAppDispatch()
	const {handleSubmit, control, reset} = useForm<LoginForm>({
		defaultValues: {
			userName: '',
		},
	})

	const submitForm = (values: LoginForm) => {
		if (values.userName) {
			dispatch(globalActions.setUserName(values.userName))
			return reset()
		}
		return
	}

	return (
		<div style={{display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
			<div style={{display: 'flex', width: '450px', height: '350px', borderRadius: 5, boxShadow: '1px 1px 55px #D7D7D7FF', overflow: 'hidden'}}>
				<div style={{display: 'flex', flexDirection: 'column', width: '135px', backgroundColor: '#CC4074', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
					<WechatOutlined style={{fontSize: '30px', color: '#343434'}} />
					<Title level={5} style={{marginTop: '5px', color: '#343434'}}>{CONSTANTS.TITLE.toUpperCase()}</Title>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#fff'}}>
					<div>
						<Title level={5} style={{textAlign: 'center', paddingTop: '10px'}}>{CONSTANTS.TITLE_LOGIN_WINDOW}</Title>
					</div>
					<div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
						<Form onFinish={handleSubmit(submitForm)}>
							<Form.Item required label={''}>
								<Controller control={control} name='userName' render={({field}) => (
									<Input {...field} placeholder='Enter your name' />
								)}>
								</Controller>
							</Form.Item>
							<Button htmlType='submit'>{CONSTANTS.JOIN_CHAT_BUTTON}</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}