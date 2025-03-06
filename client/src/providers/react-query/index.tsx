import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { queryClient } from './constants';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
