import {ThemeConfig} from 'antd'

export const theme: ThemeConfig = {
	token: {
		colorPrimary: '#bbbbbb',
		borderRadius: 5,
		colorBgContainer: '#fff',
		fontFamily: 'Montserrat',
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