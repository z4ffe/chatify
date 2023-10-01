import {SendOutlined} from '@ant-design/icons'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Input, message} from 'antd'
import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {CONSTANTS} from '../../constants/constants.ts'
import {User} from '../../entities/user.ts'
import {useAppDispatch, useAppSelector} from '../../lib/redux/typedHooks.ts'
import {userService} from '../../services/userService.ts'
import {apiDownErrorAnimation} from '../../shared/ApiDownError/apiDownErrorAnimation.ts'
import {avatarList} from '../../shared/AvatarPicker/avatarData.ts'
import {AvatarPicker} from '../../shared/AvatarPicker/AvatarPicker.tsx'
import {ErrorPanel} from '../../shared/ErrorBadge/ErrorPanel.tsx'
import {globalActions} from '../../store/global/globalSlice.ts'
import {LocalStorageHandler} from '../../utils/localStorageHandler.ts'
import {loginSchema, loginSchemaType} from '../../validations/loginSchema.ts'
import styles from './loginForm.module.scss'

export const LoginForm = () => {
	const dispatch = useAppDispatch()
	const session = useAppSelector(state => state.globalReducer.session)
	const [btnLoad, setBtnLoad] = useState(false)
	const [messageApi, contextHolder] = message.useMessage()
	const {handleSubmit, control, reset, setValue, formState: {errors}} = useForm<loginSchemaType>({
		defaultValues: {userName: '', avatar: avatarList[0].src},
		resolver: zodResolver(loginSchema),
	})

	useEffect(() => {
		void LocalStorageHandler.checkUserStatus()
	}, [])

	const submitForm = async ({userName, avatar}: loginSchemaType) => {
		setBtnLoad(true)
		const user = new User(userName, avatar)
		const userExist = await userService.checkUser(user)
		if (userExist) {
			messageApi.error({type: 'error', content: CONSTANTS.USER_EXIST_ERROR, duration: 5})
			setBtnLoad(false)
			return reset()
		}
		if (session) {
			LocalStorageHandler.addUser(user)
		}
		dispatch(globalActions.setUser(user))
		setBtnLoad(false)
		return reset()
	}

	return (
		<motion.div className={styles.loginForm} {...apiDownErrorAnimation}>
			{contextHolder}
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
		</motion.div>
	)
}