import {WechatOutlined} from '@ant-design/icons'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Form, Input} from 'antd'
import Title from 'antd/es/typography/Title'
import {motion} from 'framer-motion'
import {Controller, useForm, useWatch} from 'react-hook-form'
import {CONSTANTS} from '../../constants/constants.ts'
import {useAppDispatch} from '../../lib/redux/typedHooks.ts'
import {globalActions} from '../../store/global/globalSlice.ts'
import {loginSchema, loginSchemaType} from '../../validation/loginSchema.ts'
import styles from './Login.module.scss'

export const Login = () => {
	const dispatch = useAppDispatch()
	const {handleSubmit, control, reset, formState: {errors}} = useForm<loginSchemaType>({
		defaultValues: {userName: ''},
		resolver: zodResolver(loginSchema),
	})
	const userNameField = useWatch({control: control, name: 'userName'})

	const submitForm = (values: loginSchemaType) => {
		if (values.userName) {
			dispatch(globalActions.setUserName(values.userName))
			return reset()
		}
		return
	}

	return (
		<motion.div className={styles.loginWrapper}
						initial={{opacity: 0, scale: 0.5}}
						animate={{opacity: 1, scale: 1}}
						transition={{
							duration: 0.3,
							scale: {
								type: 'spring',
								damping: 40,
								stiffness: 150,
								restDelta: 0.0001,
							},
						}}>
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
								<Input {...field} placeholder={CONSTANTS.NICKNAME_PLACEHOLDER} className={styles.nameInput} />
							)} />
						</Form.Item>
						<Button disabled={!userNameField.length} className={styles.submitButton} htmlType='submit'>{CONSTANTS.JOIN_CHAT_BUTTON}</Button>
					</Form>
				</div>
			</div>
		</motion.div>
	)
}

