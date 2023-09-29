import {createContext, FC, PropsWithChildren, useState} from 'react'

interface IUsersListContext {
	showList: boolean
	handleShowList: () => void
}

export const UsersListContext = createContext<IUsersListContext>({} as IUsersListContext)

export const UsersListProvider: FC<PropsWithChildren> = ({children}) => {
	const [showList, setShowList] = useState(true)

	const handleShowList = () => {
		setShowList(!showList)
	}

	return (
		<UsersListContext.Provider value={{showList, handleShowList}}>
			{children}
		</UsersListContext.Provider>
	)
}