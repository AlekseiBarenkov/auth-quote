import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const ProfileProtectedRoute = () => {
	const { user, isLoading } = useAuth()

	if (isLoading) return <p>Checking authentication...</p>

	return user ? <Outlet /> : <Navigate to='/login' replace />
}
