import {QuestionCircleOutlined, RedoOutlined} from '@ant-design/icons'
import {Button, Result} from 'antd'
import {motion} from 'framer-motion'
import {FC} from 'react'
import styles from './ApiDownError.module.scss'
import {apiDownErrorAnimation} from './apiDownErrorAnimation.ts'

interface Props {
	handleApiStatus: () => void
	apiErrorLoading: boolean
}

export const ApiDownError: FC<Props> = ({handleApiStatus, apiErrorLoading}) => {
	return (
		<motion.div {...apiDownErrorAnimation} >
			<Result
				icon={<QuestionCircleOutlined />}
				title='500 Internal Server Error'
				subTitle='Oops, something went wrong.'
				extra={<Button type='primary' loading={apiErrorLoading} onClick={handleApiStatus} icon={<RedoOutlined />} className={styles.reloadBtn}>Try again</Button>}
			/>
		</motion.div>
	)
}