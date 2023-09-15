import {FC, PropsWithChildren} from 'react'

export const MainLayout: FC<PropsWithChildren> = ({children}) => {
	return (
		<div style={{maxWidth: '1920px'}}>
			{children}
		</div>
	)
}