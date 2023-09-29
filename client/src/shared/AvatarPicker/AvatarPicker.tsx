import {Popover} from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import {FC, useEffect, useState} from 'react'
import {Control, Controller, UseFormSetValue} from 'react-hook-form'
import avatar1 from '../../assets/images/avatars/avatar1.png'
import avatar2 from '../../assets/images/avatars/avatar2.png'
import avatar3 from '../../assets/images/avatars/avatar3.png'
import avatar4 from '../../assets/images/avatars/avatar4.png'
import avatar5 from '../../assets/images/avatars/avatar5.png'
import avatar6 from '../../assets/images/avatars/avatar6.png'
import {loginSchemaType} from '../../validations/loginSchema.ts'
import styles from './avatarPicker.module.scss'


const avatarList = [
	{
		name: 'avatar1',
		src: avatar1,
	},
	{
		name: 'avatar2',
		src: avatar2,
	},
	{
		name: 'avatar3',
		src: avatar3,
	},
	{
		name: 'avatar4',
		src: avatar4,
	},
	{
		name: 'avatar5',
		src: avatar5,
	},
	{
		name: 'avatar6',
		src: avatar6,
	},
]

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
		setValue('avatar', currAvatar)
	}

	useEffect(() => {
		setValue('avatar', avatarList[0].src)
	}, [])

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