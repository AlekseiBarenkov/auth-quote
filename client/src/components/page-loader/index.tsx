import { FC } from 'react';
import { Spin } from 'antd';

import './style.scss';

export const PageLoader: FC<{ message?: string }> = ({ message }) => {
	return (
		<div className='page-loader'>
			{message && <div className='page-loader__title'>{message}...</div>}

			<Spin size='large'>
				<div className='page-loader__spin-content' />
			</Spin>
		</div>
	);
};
