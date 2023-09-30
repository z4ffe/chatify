import {SendOutlined, WechatOutlined} from '@ant-design/icons'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Input, message} from 'antd'
import Title from 'antd/es/typography/Title'
import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {CONSTANTS} from '../../constants/constants.ts'
import {User} from '../../entities/user.ts'
import {useAppDispatch} from '../../lib/redux/typedHooks.ts'
import {userService} from '../../services/userService.ts'
import {avatarList} from '../../shared/AvatarPicker/avatarData.ts'
import {AvatarPicker} from '../../shared/AvatarPicker/AvatarPicker.tsx'
import {ErrorPanel} from '../../shared/ErrorBadge/ErrorPanel.tsx'
import {SessionSwitch} from '../../shared/SessionSwtich/SessionSwitch.tsx'
import {globalActions} from '../../store/global/globalSlice.ts'
import {LocalStorageHandler} from '../../utils/localStorageHandler.ts'
import {loginSchema, loginSchemaType} from '../../validations/loginSchema.ts'
import styles from './login.module.scss'
import {loginAnimation} from './loginAnimation.ts'

export const Login = () => {
	const dispatch = useAppDispatch()
	const [btnLoad, setBtnLoad] = useState(false)
	const [saveSession, setSaveSession] = useState(true)
	const [messageApi, contextHolder] = message.useMessage()
	const {handleSubmit, control, reset, setValue, formState: {errors}} = useForm<loginSchemaType>({
		defaultValues: {userName: '', avatar: avatarList[0].src},
		resolver: zodResolver(loginSchema),
	})

	useEffect(() => {
		void LocalStorageHandler.checkUserStatus()
	}, [])

	const submitForm = async (values: loginSchemaType) => {
		setBtnLoad(true)
		const userExist = await userService.checkUser({name: values.userName, avatar: values.avatar})
		if (userExist) {
			messageApi.error({type: 'error', content: 'User with this name already in chat', duration: 5})
			setBtnLoad(false)
			return reset()
		}
		const user = new User(values.userName, values.avatar)
		if (saveSession) {
			LocalStorageHandler.addUser(user)
		}
		dispatch(globalActions.setUser(user))
		setBtnLoad(false)
		return reset()
	}

	const handleSession = () => {
		setSaveSession(!saveSession)
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
				<div className={styles.formWrapper}>
					<form className={styles.form} onSubmit={handleSubmit(submitForm)}>
						<AvatarPicker control={control} setValue={setValue} />
						<Controller control={control} name='userName' render={({field}) => (
							<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', height: '40px'}}>
								<Input {...field} autoFocus placeholder={CONSTANTS.NICKNAME_PLACEHOLDER} className={styles.nameInput} status={errors.userName ? 'error' : ''} />
								<ErrorPanel errors={errors} />
							</div>
						)} />
						<Button icon={<SendOutlined />} loading={btnLoad} className={styles.submitButton} htmlType='submit'>{CONSTANTS.JOIN_CHAT_BUTTON(btnLoad)}</Button>
					</form>
				</div>
			</div>
			<div className={styles.footer}>
				<SessionSwitch handleSession={handleSession} />
			</div>
		</motion.div>
	)
}

