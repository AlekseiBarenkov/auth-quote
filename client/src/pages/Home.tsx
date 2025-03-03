import type { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

export const Home: FC = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['companyInfo'],
		queryFn: async () => {
			const response = await api.get('/info')
			return response.data
		},
	})

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error loading data</p>

	return (
		<div>
			<h1>Welcome to AuthQuote</h1>
			<p dangerouslySetInnerHTML={{ __html: data?.data.info }} />
		</div>
	)
}
