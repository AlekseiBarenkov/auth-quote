import { api, ApiResponse } from '../../api';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from './constants';
import { QUERY_KEYS } from '../react-query/constants';

export type User = {
	fullname: string;
	email: string;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: user, isFetching } = useQuery<User | null>({
		queryKey: [QUERY_KEYS.PROFILE],
		queryFn: async () => {
			try {
				const response = await api.get<ApiResponse<User>>('/user/profile');
				if (response.data.success) {
					return response.data.data;
				}
				return null;
			} catch {
				return null;
			}
		}
	});

	return (
		<AuthContext.Provider value={{ isLoading: isFetching, user }}>
			{children}
		</AuthContext.Provider>
	);
};
