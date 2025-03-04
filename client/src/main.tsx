import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from './providers/react-query/index.tsx';
import App from './App.tsx';
import { AuthProvider } from './providers/auth/index.tsx';
import '@ant-design/v5-patch-for-react-19';

import './assets/style/normalize.scss';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</QueryProvider>
	</StrictMode>
);
