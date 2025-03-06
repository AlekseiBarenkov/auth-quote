import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import './style.scss';

export const Header: FC = () => {
	const { user } = useAuth();

	const routes = [
		{ path: '/', label: 'About us', disable: false },
		{ path: '/profile', label: 'Profile', disable: !user },
		{ path: '/logout', label: 'Sign out', disable: !user },
		{ path: '/login', label: 'Sign in', disable: !!user }
	];

	const renderLinks = () => {
		return routes
			.filter((route) => !route.disable)
			.map((route) => (
				<li key={route.path} className='nav-menu__list-item'>
					<NavLink
						to={route.path}
						className={({ isActive }) => (isActive ? 'active' : '')}
					>
						{route.label}
					</NavLink>
				</li>
			));
	};

	return (
		<header className='header'>
			<nav className='nav-menu'>
				<ul className='nav-menu__list'>{renderLinks()}</ul>
			</nav>
		</header>
	);
};
