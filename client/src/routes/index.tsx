import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { RootLayout } from '../layouts/root';
import { Home, NotFound } from '../pages';
import { Login } from '../pages';
import { Profile } from '../pages';
import { ProfileProtectedRoute } from './profile-protected-route';
import { api } from '../api';
import { QUERY_KEYS, queryClient } from '../providers/react-query/constants';
import { RouterErrorBoundary } from '../components';

const logoutLoader = async () => {
	try {
		const response = await api.delete('/auth/logout');

		if (!response.data.success) {
			throw new Error(response.data.data.message);
		}

		queryClient.setQueryData([QUERY_KEYS.PROFILE], null);

		return redirect('/login');
	} catch (error) {
		console.error('Logout error:', error);
		throw new Error('Failed to logout');
	}
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <RouterErrorBoundary />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/login', element: <Login /> },
			{
				path: '/',
				element: <ProfileProtectedRoute />,
				children: [{ path: '/profile', element: <Profile /> }]
			},
			{
				path: '/logout',
				loader: logoutLoader,
				element: <p>Logging out...</p>
			}
		]
	},
	{
		path: '*',
		element: <NotFound />
	}
]);

export const AppRouter = () => <RouterProvider router={router} />;
