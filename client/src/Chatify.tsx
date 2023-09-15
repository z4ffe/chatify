import {Provider} from 'react-redux'
import {MainLayout} from './layout/mainLayout.tsx'
import {Home} from './pages/Home.tsx'
import store from './store/store.ts'

export const Chatify = () => {
	return (
		<Provider store={store}>
			<MainLayout>
				<Home />
			</MainLayout>
		</Provider>
	)
}