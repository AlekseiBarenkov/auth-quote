import type { FC } from 'react';
import { useRouteError } from 'react-router-dom';

import './style.scss';

export const RouterErrorBoundary: FC = () => {
	const error = useRouteError();

	return (
		<div className='router-error-boundary'>
			<h1>Something went wrong 😢</h1>
			<p>Error: "{error instanceof Error ? error.message : 'Unknown error'}"</p>
		</div>
	);
};
