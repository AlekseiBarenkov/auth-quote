import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const loginMutation = useMutation({
		mutationFn: async () => {
			console.log()
			await api.post('/auth/login', { email, password })
		},
		onSuccess: () => {
			navigate('/profile')
		},
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		loginMutation.mutate()
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<button type='submit' disabled={loginMutation.isPending}>
					{loginMutation.isPending ? 'Logging in...' : 'Login'}
				</button>
			</form>
			{loginMutation.isError && <p>{loginMutation.error.message}</p>}
		</div>
	)
}
