import { useRef, useState } from 'react';
import { Author, Quote } from '../@types';
import { api, ApiResponse } from '../api';
import { useModal } from './useModal';

type Data<T> =
	| {
			data: null;
			isLoading: true;
			error: null;
	  }
	| {
			data: T;
			isLoading: false;
			error: null;
	  }
	| {
			data: null;
			isLoading: false;
			error: string;
	  };

export type AuthorQuoteState = {
	quote: Data<Quote>;
	author: Data<Author>;
};

const initialData = {
	data: null,
	isLoading: true,
	error: null
} as const;

const initial: AuthorQuoteState = {
	author: { ...initialData },
	quote: { ...initialData }
} as const;

export const useAuthorQuote = () => {
	const { isOpen: showModal, openModal, closeModal } = useModal();
	const [data, setData] = useState<AuthorQuoteState>({ ...initial });

	const abortController = useRef<AbortController>(new AbortController());

	const fetchData = async () => {
		abortController.current = new AbortController();
		const signal = abortController.current.signal;

		try {
			setData({ ...initial });

			const authorResponse = await api.get<ApiResponse<Author>>('/quotes/author', {
				signal
			});

			if (!authorResponse.data.success) {
				const error = authorResponse.data.data.message;

				setData((prev) => ({
					...prev,
					author: {
						data: null,
						isLoading: false,
						error
					}
				}));
				return;
			}
			const author = authorResponse.data.data;

			setData((prev) => ({
				...prev,
				author: {
					data: author,
					isLoading: false,
					error: null
				}
			}));

			const quoteResponse = await api.get<ApiResponse<Quote>>(
				`/quotes/quote?authorId=${authorResponse.data.data.authorId}`,
				{ signal }
			);

			if (!quoteResponse.data.success) {
				const error = quoteResponse.data.data.message;
				setData((prev) => ({
					...prev,
					quote: {
						data: null,
						isLoading: false,
						error
					}
				}));
				return;
			}

			const quote = quoteResponse.data.data;

			setData((prev) => ({
				...prev,
				quote: {
					data: quote,
					isLoading: false,
					error: null
				}
			}));
		} catch (error) {
			if (!signal.aborted) {
				setData({
					quote: {
						data: null,
						isLoading: false,
						error: error instanceof Error ? error.message : 'Unexpected error'
					},
					author: {
						data: null,
						isLoading: false,
						error: error instanceof Error ? error.message : 'Unexpected error'
					}
				});
			}
		}
	};

	const handleCancel = () => {
		closeModal();
		setData({ ...initial });
		abortController.current.abort();
	};

	const handleOpenModal = async () => {
		setData({ ...initial });
		openModal();

		await fetchData();
	};

	return { data, showModal, handleOpenModal, closeModal, handleCancel };
};
