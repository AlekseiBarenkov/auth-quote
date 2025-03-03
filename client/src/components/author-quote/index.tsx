import type { FC } from 'react';
import { AuthorQuoteState } from '../../hooks/useAuthorQuote';

export const AuthorQuote: FC<{ data: AuthorQuoteState }> = ({ data }) => {
	const author = data.author.data?.name;
	const quote = data.quote.data?.quote;

	const text = author && quote ? <p>{`${author}: ${quote}`}</p> : null;

	return text;
};
