import {WechatOutlined} from '@ant-design/icons'
import Title from 'antd/es/typography/Title'
import {CONSTANTS} from '../../constants/constants.ts'
import {ProfileCard} from '../../shared/ProfileCard/ProfileCard.tsx'
import styles from './header.module.scss'

export const Header = () => {
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
			</div>
		</div>
	)
}