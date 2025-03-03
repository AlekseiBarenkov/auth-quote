import type { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { api, ApiResponse } from '../../api'
import { useAuth } from '../../hooks/useAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../providers/react-query/constants'

export const Header: FC = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const queryClient = useQueryClient()

	const routes = [
		{ path: '/', label: 'About us', disable: false },
		{ path: '/profile', label: 'Profile', disable: !user },
		{ path: '/login', label: 'Sign in', disable: !!user },
	]

	const logoutMutation = useMutation({
		mutationFn: async () => {
			const response = await api.delete<ApiResponse<Record<string, never>>>(
				'/auth/logout'
			)

			if (!response.data.success) {
				throw new Error(response.data.data.message)
			}
		},
		onSuccess: () => {
			queryClient.setQueryData([QUERY_KEYS.PROFILE], null)
			navigate('/login')
		},
	})

	const renderLinks = () => {
		return routes
			.filter(route => !route.disable)
			.map(route => (
				<li key={route.path}>
					<NavLink to={route.path}>{route.label}</NavLink>
				</li>
			))
	}

	return (
		<header className='header'>
			<nav className='nav-menu'>
				<ul className='nav-menu__list'>
					{renderLinks()}
					{user && (
						<li>
							<button
								disabled={logoutMutation.isPending}
								onClick={() => logoutMutation.mutate()}
							>
								Sign out
							</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}
