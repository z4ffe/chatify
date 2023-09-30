import {AnimatePresence, motion} from 'framer-motion'
import {useContext} from 'react'
import {UsersListContext} from '../../context/usersListContext.tsx'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import {UserBox} from '../../shared/UserBox/UserBox.tsx'
import styles from './usersList.module.scss'
import {usersListAnimation} from './usersListAnimation.ts'

export const UsersList = () => {
	const {clientsList} = useAppSelector(state => state.globalReducer)
	const {showList} = useContext(UsersListContext)

	return (
		<AnimatePresence mode='wait' initial={false}>
			{showList && <motion.div {...usersListAnimation} className={styles.usersList}>
				{clientsList.map((client) => (
					<UserBox key={client.name} user={client.name} src={client.avatar} />
				))}
			</motion.div>}
		</AnimatePresence>
	)
}