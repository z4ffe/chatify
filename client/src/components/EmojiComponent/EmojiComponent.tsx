import {SmileOutlined} from '@ant-design/icons'
import {Button, Popconfirm} from 'antd'
import EmojiPicker, {EmojiClickData} from 'emoji-picker-react'
import {FC} from 'react'
import styles from './emojiComponent.module.scss'

interface Props {
	handleEmoji: (event: EmojiClickData) => void
}

export const EmojiComponent: FC<Props> = ({handleEmoji}) => {
	return (
		<div className={styles.container}>
			<Popconfirm
				placement='topRight'
				icon={false}
				showCancel={false}
				okText=''
				okType='text'
				title={''}
				description={<EmojiPicker lazyLoadEmojis={true} skinTonesDisabled={true} onEmojiClick={handleEmoji} />}
			>
				<Button className={styles.emojiButton} icon={<SmileOutlined className={styles.icon} />}></Button>
			</Popconfirm>
		</div>
	)
}