import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, ApiResponse } from '../../api';
import { Skeleton } from 'antd';

import './style.scss';

const Home: FC = () => {
	const { data, isLoading, error, isError } = useQuery({
		queryKey: ['companyInfo'],
		queryFn: async () => {
			const response = await api.get<ApiResponse<{ info: string }>>('/info');

			if (!response.data.success) {
				throw new Error('Error loading data');
			}
			return response.data;
		}
	});

	return (
		<section className='home'>
			{isLoading && <Skeleton paragraph={{ rows: 1 }} />}

			{isError && <p style={{ color: 'red', fontSize: '1.2rem' }}>{error.message}</p>}

			{!!data?.data.info && (
				<div
					className='home__info'
					dangerouslySetInnerHTML={{ __html: data.data.info }}
				/>
			)}
		</section>
	);
};

export default Home;
