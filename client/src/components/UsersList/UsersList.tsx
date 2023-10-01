import {AnimatePresence, motion} from 'framer-motion'
import {useContext} from 'react'
import {useMediaQuery} from 'react-responsive'
import {UsersListContext} from '../../context/usersListContext.tsx'
import {useAppSelector} from '../../lib/redux/typedHooks.ts'
import {ChatNotification} from '../../shared/ChatNotification/ChatNotification.tsx'
import {UserBox} from '../../shared/UserBox/UserBox.tsx'
import styles from './usersList.module.scss'
import {usersListAnimation} from './usersListAnimation.ts'

export const UsersList = () => {
	const {clientsList} = useAppSelector(state => state.globalReducer)
	const {showList} = useContext(UsersListContext)
	const isMobile = useMediaQuery({query: '(max-width: 550px)'})

	return (
		<AnimatePresence mode='wait' initial={false}>
			{isMobile ? <ChatNotification text={'Users list'} /> : null}
			{showList && <motion.div {...usersListAnimation} className={styles.usersList}>
				{clientsList.map((client) => (
					<UserBox key={client.name} user={client.name} src={client.avatar} agent={client.agent} />
				))}
			</motion.div>}
		</AnimatePresence>
	)
}