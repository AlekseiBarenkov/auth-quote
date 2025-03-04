import type { FC } from 'react';
import { AuthorQuoteState } from '../../hooks/useAuthorQuote';

import './style.scss';

export const AuthorQuote: FC<{ data: AuthorQuoteState }> = ({ data }) => {
	const author = data.author.data?.name;
	const quote = data.quote.data?.quote;

	const authorQuote =
		author && quote ? <p className='author-quote'>{`${author}: "${quote}"`}</p> : null;

	return authorQuote;
};
