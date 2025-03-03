import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components';

export const RootLayout: FC = () => {
	return (
		<div className='main'>
			<Header />

			<main className='main__content'>
				<Outlet />
			</main>
		</div>
	);
};
