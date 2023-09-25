import {RefObject} from 'react'

export const scrollToBottom = (ref: RefObject<HTMLElement>) => {
	ref.current?.scrollIntoView()
}