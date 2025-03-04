import type { FC } from 'react';
import { User } from '../../@types';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import './style.scss';

export const UserCard: FC<{ user: User; handleUpdateQuote: () => void }> = ({
	user,
	handleUpdateQuote
}) => {
	return (
		<div className='user-card'>
			<div className='user-card__left'>
				<UserOutlined className='user-card__icon' />
			</div>

			<div className='user-card__right'>
				<h1 className='user-card__title'>Welcome, {user?.fullname}!</h1>

				<Button
					type='primary'
					className='user-card__button'
					onClick={() => handleUpdateQuote()}
				>
					Update
				</Button>
			</div>
		</div>
	);
};
