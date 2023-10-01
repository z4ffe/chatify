import {apiInstance} from '../lib/axios/apiInstance.ts'

class HealthService {
	async checkApi() {
		try {
			const response = await apiInstance.get(`/health`)
			return response.status === 200
		} catch (error) {
			console.error(error)
			return false
		}
	}
}

export const healthService = new HealthService()