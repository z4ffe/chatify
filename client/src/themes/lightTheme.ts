import {ThemeConfig} from 'antd'

export const lightTheme: ThemeConfig = {
	token: {
		colorPrimary: '#bbbbbb',
		borderRadius: 5,
		colorBgContainer: '#fff',
	},
	components: {
		Typography: {
			fontSize: 20,
		},
		Table: {
			fontSize: 16,
			fontWeightStrong: 500,
		},
		Button: {
			fontSize: 15,
			fontWeightStrong: 500,
		},
	},
}