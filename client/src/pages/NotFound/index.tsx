import { FC } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const NotFound: FC = () => {
	return (
		<div className='not-found'>
			<h1 className='not-found__title'>404 - Page not found</h1>

			<Link to='/' className='not-found__link'>
				{'<<'} Back to home
			</Link>
		</div>
	);
};
export default NotFound;
