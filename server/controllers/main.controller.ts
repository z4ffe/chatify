import {Request, Response} from 'express'

class MainController {
	async healthCheck(_: Request, res: Response) {
		try {
			res.status(200).json({statusCode: 200, message: 'OK'})
		} catch (error) {
			res.status(404).json({statusCode: 404, message: 'Something went wrong', errorMessage: error})
			throw error
		}
	}
}

export default new MainController()