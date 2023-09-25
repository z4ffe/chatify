import {CONSTANTS} from '../../constants/constants.ts'
import styles from './footer.module.scss'

export const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div className={styles.footer}>
			<p className={styles.footerText}>Handcrafted by <a href={CONSTANTS.GITHUB_LINK}>Paul Lightman</a></p>
			<p className={styles.footerText}>{currentYear}</p>
		</div>
	)
}