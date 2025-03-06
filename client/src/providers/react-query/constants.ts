import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const QUERY_KEYS = {
	PROFILE: 'profile'
} as const;
