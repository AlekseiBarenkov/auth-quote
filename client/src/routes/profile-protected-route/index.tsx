import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Skeleton } from 'antd';

export const ProfileProtectedRoute = () => {
	const { user, isLoading } = useAuth();

	if (isLoading) return <Skeleton avatar={{ size: 100 }} paragraph={{ rows: 3 }} />;

	return user ? <Outlet /> : <Navigate to='/login' replace />;
};
