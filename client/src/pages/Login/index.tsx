import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api, ApiResponse } from '../../api';
import { QUERY_KEYS } from '../../providers/react-query/constants';
import { Button, Form, FormProps, Input } from 'antd';

import './style.scss';

type FormData = {
	email: string;
	password: string;
};

const Login = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [error, setError] = useState('');

	const loginMutation = useMutation({
		mutationFn: async (formData: FormData) => {
			const response = await api.post<ApiResponse<{ token: string }>>(
				'/auth/login',
				formData
			);

			if (!response.data.success) {
				throw new Error(response.data.data.message);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
			navigate('/profile');
		},
		onError: (error: Error) => {
			setError(error.message);
		}
	});

	const onSubmit: FormProps<FormData>['onFinish'] = (data) => {
		loginMutation.mutate(data);
	};

	const onValuesChange = () => {
		if (error) setError('');
	};

	return (
		<section className='login'>
			<Form
				name='wrap'
				layout='vertical'
				initialValues={{ remember: true }}
				onFinish={onSubmit}
				onValuesChange={onValuesChange}
				autoComplete='off'
				style={{ maxWidth: 400 }}
			>
				<Form.Item layout='vertical' label='Email address'>
					<Form.Item<FormData>
						name='email'
						noStyle
						rules={[
							{ required: true, message: 'Please input your email!' },
							{ type: 'email', message: 'Invalid email address' }
						]}
					>
						<Input placeholder='Enter your email' />
					</Form.Item>
				</Form.Item>

				<Form.Item layout='vertical' label='Password'>
					<Form.Item<FormData>
						name='password'
						noStyle
						rules={[
							{ required: true, message: 'Please input your password!' },
							{ min: 6, message: 'Password must be at least 6 characters' }
						]}
					>
						<Input.Password placeholder='Password' />
					</Form.Item>
				</Form.Item>

				{!!error && (
					<Form.Item label={null}>
						<div className='login__error'>4124</div>
					</Form.Item>
				)}

				<Form.Item label={null}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</section>
	);
};

export default Login;
