import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '../layouts/root';
import { Home } from '../pages';
import { Login } from '../pages';
import { Profile } from '../pages';
import { ProfileProtectedRoute } from './profile-protected-route';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/login', element: <Login /> },
			{
				path: '/',
				element: <ProfileProtectedRoute />,
				children: [{ path: '/profile', element: <Profile /> }]
			}
		]
	}
]);

export const AppRouter = () => <RouterProvider router={router} />;
