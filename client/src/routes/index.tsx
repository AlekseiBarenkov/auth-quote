import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Profile } from '../pages/Profile'

const router = createBrowserRouter([
	{ path: '/', element: <Home /> },
	{ path: '/login', element: <Login /> },
	{ path: '/profile', element: <Profile /> },
])

export const AppRouter = () => <RouterProvider router={router} />
