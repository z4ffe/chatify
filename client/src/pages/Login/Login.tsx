import {WechatOutlined} from '@ant-design/icons'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Form, Input, message} from 'antd'
import Title from 'antd/es/typography/Title'
import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import {Controller, useForm, useWatch} from 'react-hook-form'
import {CONSTANTS} from '../../constants/constants.ts'
import {useAppDispatch} from '../../lib/redux/typedHooks.ts'
import {userService} from '../../service/userService.ts'
import {globalActions} from '../../store/global/globalSlice.ts'
import {LocalStorageHandler} from '../../utils/localStorageHandler.ts'
import {loginSchema, loginSchemaType} from '../../validation/loginSchema.ts'
import styles from './login.module.scss'
import {loginAnimation} from './loginAnimation.ts'

export const Login = () => {
	const dispatch = useAppDispatch()
	const [btnLoad, setBtnLoad] = useState(false)
	const [messageApi, contextHolder] = message.useMessage()
	const {handleSubmit, control, reset, formState: {errors}} = useForm<loginSchemaType>({
		defaultValues: {userName: ''},
		resolver: zodResolver(loginSchema),
	})
	const userNameField = useWatch({control: control, name: 'userName'})

	const checkUser = async (): Promise<void> => {
		const result = await LocalStorageHandler.checkUserStatus()
		if (typeof result === 'string') {
			dispatch(globalActions.setUserName(result))
		}
	}

	useEffect(() => {
		checkUser()
	}, [])

	const submitForm = async (values: loginSchemaType) => {
		setBtnLoad(true)
		const userExist = await userService.checkUser(values.userName)
		if (userExist) {
			messageApi.error({type: 'error', content: 'User with this name already in chat', duration: 5})
			setBtnLoad(false)
			return reset()
		}
		LocalStorageHandler.addUser(values.userName)
		dispatch(globalActions.setUserName(values.userName))
		setBtnLoad(false)
		return reset()
	}

	return (
		<motion.div className={styles.loginWrapper} {...loginAnimation}>
			{contextHolder}
			<div className={styles.loginHeader}>
				<div className={styles.headerWrapper}>
					<WechatOutlined className={styles.headerIcon} />
					<Title className={styles.headerTitle}>{CONSTANTS.TITLE.toUpperCase()}</Title>
				</div>
			</div>
			<div className={styles.loginForm}>
				<Title className={styles.formTitle}>{CONSTANTS.TITLE_LOGIN_WINDOW}</Title>
				<div className={styles.formWrapper}>
					<Form className={styles.form} onFinish={handleSubmit(submitForm)}>
						<Form.Item required label='' help={errors.userName?.message} validateStatus={errors.userName ? 'error' : ''}>
							<Controller control={control} name='userName' render={({field}) => (
								<Input {...field} autoFocus placeholder={CONSTANTS.NICKNAME_PLACEHOLDER} className={styles.nameInput} />
							)} />
						</Form.Item>
						<Button loading={btnLoad} disabled={!userNameField.length} className={styles.submitButton} htmlType='submit'>{CONSTANTS.JOIN_CHAT_BUTTON(btnLoad)}</Button>
					</Form>
				</div>
			</div>
		</motion.div>
	)
}

