export const CONSTANTS = {
	TITLE: 'Chatify',
	TITLE_LOGIN_WINDOW: 'PLEASE LOGIN',
	JOIN_CHAT_BUTTON: (status: boolean) => status ? 'Joining chat...' : 'Join chat',
	NICKNAME_PLACEHOLDER: 'Enter your nickname',
	GITHUB_LINK: 'https://github.com/z4ffe',
	WELCOME_MESSAGE: (user: string) => `Welcome to Chatify, ${user}!`,
	USER_EXIST_ERROR: 'User with this name already in chat',
	LOGGED_OUT_MSG: 'You have successfully logged out',
}