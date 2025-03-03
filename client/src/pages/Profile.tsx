import { useQuery, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export const Profile = () => {
	const navigate = useNavigate()
	const [quote, setQuote] = useState('')
	const [isFetchingQuote, setIsFetchingQuote] = useState(false)
	let abortController = new AbortController()

	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			const response = await api.get('/user/profile')
			return response.data
		},
	})

	const fetchQuote = useMutation({
		mutationFn: async () => {
			setIsFetchingQuote(true)
			abortController = new AbortController()

			const authorResponse = await api.get('/quotes/author', {
				signal: abortController.signal,
			})
			const quoteResponse = await api.get(
				`/quotes/quote?authorId=${authorResponse.data.data.authorId}`,
				{ signal: abortController.signal }
			)

			return `${authorResponse.data.data.name}: "${quoteResponse.data.data.quote}"`
		},
		onSuccess: data => {
			setQuote(data)
			setIsFetchingQuote(false)
		},
		onError: () => {
			setQuote('Error fetching quote')
			setIsFetchingQuote(false)
		},
	})

	const handleLogout = async () => {
		await api.delete('/auth/logout')
		navigate('/login')
	}

	const cancelFetching = () => {
		abortController.abort()
		setIsFetchingQuote(false)
		setQuote('Fetching canceled')
	}

	if (isLoading) return <p>Loading...</p>

	return (
		<div>
			<h1>Welcome, {user?.data.fullname}</h1>
			<p>Email: {user?.data.email}</p>

			<button onClick={() => fetchQuote.mutate()} disabled={isFetchingQuote}>
				{isFetchingQuote ? 'Fetching...' : 'Get Quote'}
			</button>

			{isFetchingQuote && <button onClick={cancelFetching}>Cancel</button>}
			{quote && <p>{quote}</p>}

			<button onClick={handleLogout}>Logout</button>
		</div>
	)
}
