import {z} from 'zod'

export const loginSchema = z.object({
	userName: z.string()
		.min(3, 'Nickname must be longer than 3 symbols')
		.max(15, 'Nickname must be shorter than 15 symbols')
		.refine((value) => /^[a-zA-Z0-9]+[-'s]?[a-zA-Z0-9]+$/.test(value), 'Nickname should contain only letters and digits'),
	avatar: z.string(),
})

export type loginSchemaType = z.infer<typeof loginSchema>