import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { api, ApiResponse } from '../api'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { QUERY_KEYS } from '../providers/react-query/constants'

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormData = z.infer<typeof loginSchema>

export const Login = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<FormData>({
		resolver: zodResolver(loginSchema), // Подключаем Zod для валидации
	})

	const loginMutation = useMutation({
		mutationFn: async (formData: FormData) => {
			const response = await api.post<ApiResponse<{ token: string }>>(
				'/auth/login',
				formData
			)

			if (!response.data.success) {
				throw new Error(response.data.data.message)
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] })
			navigate('/profile')
		},
		onError: (error: Error) => {
			setError('root', {
				type: 'manual',
				message: error.message,
			})
		},
	})

	const onSubmit: SubmitHandler<FormData> = data => {
		loginMutation.mutate(data)
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input type='email' placeholder='Email' {...register('email')} />
					{errors.email && <p>{errors.email.message}</p>}
				</div>

				<div>
					<input
						type='password'
						placeholder='Password'
						{...register('password')}
					/>
					{errors.password && <p>{errors.password.message}</p>}
				</div>

				<button type='submit' disabled={loginMutation.isPending}>
					{loginMutation.isPending ? 'Logging in...' : 'Login'}
				</button>

				{errors.root && <p>{errors.root.message}</p>}
			</form>
		</div>
	)
}
