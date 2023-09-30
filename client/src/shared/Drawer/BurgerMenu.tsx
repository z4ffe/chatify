import {Drawer} from 'antd'
import {FC} from 'react'
import {UsersList} from '../../components/UsersList/UsersList.tsx'
import {ProfileCard} from '../ProfileCard/ProfileCard.tsx'

interface Props {
	showDrawer: boolean
	handleDrawer: () => void
}

export const BurgerMenu: FC<Props> = ({showDrawer, handleDrawer}) => {
	return (
		<Drawer width={350} placement='right' title={<ProfileCard />} open={showDrawer} onClose={handleDrawer} closeIcon={false}>
			<UsersList />
		</Drawer>
	)
}