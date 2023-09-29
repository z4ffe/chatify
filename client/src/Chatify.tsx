import {ConfigProvider} from 'antd'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {UsersListProvider} from './context/usersListContext.tsx'
import {MainLayout} from './layout/MainLayout.tsx'
import {Router} from './routes/Router.tsx'
import store from './store/store.ts'
import {lightTheme} from './themes/lightTheme.ts'

export const Chatify = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<ConfigProvider theme={lightTheme}>
					<UsersListProvider>
						<MainLayout>
							<Router />
						</MainLayout>
					</UsersListProvider>
				</ConfigProvider>
			</Provider>
		</BrowserRouter>
	)
}