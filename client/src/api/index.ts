import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export type ApiResponse<T> =
	| {
			success: true
			data: T
	  }
	| {
			success: false
			data: {
				message: string
			}
	  }

export const api = axios.create({
	baseURL: API_BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true, // Добавляем поддержку cookies
})
