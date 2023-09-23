import {WechatOutlined} from '@ant-design/icons'
import {Button, Form, Input} from 'antd'
import Title from 'antd/es/typography/Title'
import {Controller, useForm} from 'react-hook-form'
import {CONSTANTS} from '../../constants/constants.ts'
import {useAppDispatch} from '../../lib/redux/typedHooks.ts'
import {globalActions} from '../../store/global/globalSlice.ts'
import styles from './Login.module.scss'

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
		<div className={styles.loginWrapper}>
			<div className={styles.loginHeader}>
				<div className={styles.headerWrapper}>
					<WechatOutlined className={styles.headerIcon} />
					<Title className={styles.headerTitle}>{CONSTANTS.TITLE.toUpperCase()}</Title>
				</div>
			</div>
			<div className={styles.loginForm}>
				<Title>{CONSTANTS.TITLE_LOGIN_WINDOW}</Title>
				<div>
					<Form onFinish={handleSubmit(submitForm)}>
						<Form.Item required label={''}>
							<Controller control={control} name='userName' render={({field}) => (
								<Input {...field} placeholder={CONSTANTS.NICKNAME_PLACEHOLDER} />
							)}>
							</Controller>
						</Form.Item>
						<Button htmlType='submit'>{CONSTANTS.JOIN_CHAT_BUTTON}</Button>
					</Form>
				</div>
			</div>
		</div>
	)
}

