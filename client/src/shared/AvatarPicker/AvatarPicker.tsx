import {Popover} from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import {FC, useState} from 'react'
import {Control, Controller, UseFormSetValue} from 'react-hook-form'
import avatar1 from '../../assets/images/avatars/avatar1.png'
import {loginSchemaType} from '../../validations/loginSchema.ts'
import {avatarList} from './avatarData.ts'
import styles from './avatarPicker.module.scss'

interface Props {
	control: Control<loginSchemaType>
	setValue: UseFormSetValue<loginSchemaType>
}

export const AvatarPicker: FC<Props> = ({control, setValue}) => {
	const [currAvatar, setCurrAvatar] = useState(avatar1)
	const [showPicker, setShowPicker] = useState(false)

	const handleCurrAvatar = (src: string) => {
		setShowPicker(false)
		setCurrAvatar(src)
		setValue('avatar', src)
	}

	const avatarListContent =
		<div className={styles.pickerWrapper}>
			{avatarList.map((avatar) => {
				if (avatar.src !== currAvatar) {
					return (<Avatar className={styles.avatar} key={avatar.name} src={avatar.src} onClick={() => handleCurrAvatar(avatar.src)} size='large' />)
				}
			})}
		</div>

	const title = <p className={styles.title}>Choose avatar</p>

	return (
		<div className={styles.avatarPicker}>
			<Popover open={showPicker} placement='top'
						arrow={false}
						title={title}
						content={avatarListContent}
						trigger='click'>
				<Avatar className={styles.currentAvatar} src={currAvatar} onClick={() => setShowPicker(!showPicker)} size='large' />
				<Controller control={control} render={({field}) => (
					<input hidden {...field} />
				)} name='avatar' />
			</Popover>
		</div>
	)
}