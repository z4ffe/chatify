import {RightOutlined} from '@ant-design/icons'
import {Button, Input} from 'antd'
import {EmojiClickData} from 'emoji-picker-react'
import React, {FC, SyntheticEvent} from 'react'
import {EmojiComponent} from '../EmojiComponent/EmojiComponent.tsx'
import styles from './inputPanel.module.scss'

interface Props {
	input: string
	handleInput: (event: SyntheticEvent<HTMLInputElement>) => void
	handleEnterKey: (event: React.KeyboardEvent<HTMLInputElement>) => void
	handleEmoji: (event: EmojiClickData) => void
	handleSendMsg: () => void
}

export const InputPanel: FC<Props> = ({handleInput, handleEnterKey, input, handleEmoji, handleSendMsg}) => {
	return (
		<div className={styles.inputPanel}>
			<EmojiComponent handleEmoji={handleEmoji} />
			<Input className={styles.input} autoFocus placeholder='Enter your message...' onChange={handleInput} value={input} onKeyDown={(e) => handleEnterKey(e)} />
			<Button className={styles.sendButton} onClick={handleSendMsg} icon={<RightOutlined className={styles.arrow} />}></Button>
		</div>
	)
}