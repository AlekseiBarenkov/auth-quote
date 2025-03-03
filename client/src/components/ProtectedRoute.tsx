import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router-dom'
import { api } from '../api'

export const ProtectedRoute = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['authCheck'],
		queryFn: async () => {
			const response = await api.get('/user/profile')
			return response.data
		},
		retry: false,
	})

	if (isLoading) return <p>Checking authentication...</p>

	return data ? <Outlet /> : <Navigate to='/login' replace />
}
