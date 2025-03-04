import { Suspense, type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, PageLoader } from '../../components';

import './style.scss';

export const RootLayout: FC = () => {
	return (
		<div className='main'>
			<Header />

			<main className='main__content'>
				<Suspense fallback={<PageLoader />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};
