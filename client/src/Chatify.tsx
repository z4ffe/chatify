import {ConfigProvider} from 'antd'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {MainLayout} from './layout/MainLayout.tsx'
import {Router} from './routes/Router.tsx'
import store from './store/store.ts'
import {theme} from './theme/theme.ts'

export const Chatify = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<ConfigProvider theme={theme}>
					<MainLayout>
						<Router />
					</MainLayout>
				</ConfigProvider>
			</Provider>
		</BrowserRouter>
	)
}