import {AndroidFilled, AppleFilled, QuestionCircleFilled, WindowsFilled} from '@ant-design/icons'
import {ReactNode} from 'react'

export const userAgentType = (userAgent: string): ReactNode => {
	switch (true) {
		case (/window/i.test(userAgent)):
			return <WindowsFilled style={{paddingBottom: '3px'}} />
		case (/iphone|ipad|macintosh/i.test(userAgent)):
			return <AppleFilled style={{paddingBottom: '3px'}} />
		case (/android/i.test(userAgent)):
			return <AndroidFilled style={{paddingBottom: '3px'}} />
		default:
			return <QuestionCircleFilled style={{paddingBottom: '3px'}} />
	}
}