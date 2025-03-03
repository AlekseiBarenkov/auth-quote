import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProfileProtectedRoute } from './profile-protected-route'
import { RootLayout } from '../layouts/root'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Profile } from '../pages/Profile'

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
				children: [{ path: '/profile', element: <Profile /> }],
			},
		],
	},
])

export const AppRouter = () => <RouterProvider router={router} />
