import {AnimatePresence, motion} from 'framer-motion'
import {FC} from 'react'
import {FieldErrors} from 'react-hook-form'
import {loginSchemaType} from '../../validations/loginSchema.ts'
import styles from './errorBadge.module.scss'
import {errorBadgeAnimation} from './errorBadgeAnimation.ts'

interface Props {
	errors: FieldErrors<loginSchemaType>
}

export const ErrorPanel: FC<Props> = ({errors}) => {
	return (
		<AnimatePresence>
			{errors.userName &&
				<motion.div className={styles.errorBadge} {...errorBadgeAnimation}>
					<p className={styles.text}>{errors.userName.message}</p>
				</motion.div>}
		</AnimatePresence>
	)
}