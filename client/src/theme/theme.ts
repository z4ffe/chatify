import {ThemeConfig} from 'antd'

export const theme: ThemeConfig = {
	token: {
		colorPrimary: '#000000',
		borderRadius: 41,
		colorBgContainer: '#f6ffed',
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