import {MenuOutlined, WechatOutlined} from '@ant-design/icons'
import {Button} from 'antd'
import Title from 'antd/es/typography/Title'
import {useState} from 'react'
import {CONSTANTS} from '../../constants/constants.ts'
import {BurgerMenu} from '../../shared/Drawer/BurgerMenu.tsx'
import {ProfileCard} from '../../shared/ProfileCard/ProfileCard.tsx'
import styles from './header.module.scss'

export const Header = () => {
	const [showDrawer, setShowDrawer] = useState(false)

	const handleDrawer = () => {
		setShowDrawer(!showDrawer)
	}

	return (
		<div className={styles.headerWrapper}>
			<div className={styles.headerWrapper__filter}>
				<div className={styles.logoContainer}>
					<WechatOutlined className={styles.logoIcon} />
					<Title className={styles.headerTitle}>{CONSTANTS.TITLE.toUpperCase()}</Title>
				</div>
				<div className={styles.statusContainer}>
					<ProfileCard />
				</div>
				<Button icon={<MenuOutlined className={styles.icon} />} className={styles.burgerBtn} onClick={handleDrawer}></Button>
			</div>
			<BurgerMenu showDrawer={showDrawer} handleDrawer={handleDrawer} />
		</div>
	)
}