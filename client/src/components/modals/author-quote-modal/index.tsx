import type { FC } from 'react';
import { Button, Modal } from 'antd';
import { AuthorQuoteState } from '../../../hooks/useAuthorQuote';

interface Props {
	data: AuthorQuoteState;
	onCancel: () => void;
	onClose: () => void;
	isOpen: boolean;
}

export const AuthorQuoteModal: FC<Props> = ({ data, onClose, isOpen, onCancel }) => {
	const dataKeys = Object.keys(data) as (keyof AuthorQuoteState)[];
	const isLoading = dataKeys.some((key) => data[key].isLoading === true);

	const handleClose = () => {
		if (isLoading) {
			onCancel();
			return;
		}
		onClose();
	};

	return (
		<Modal
			destroyOnClose
			title={<h2>Requesting the quote</h2>}
			footer={
				<Button
					className='author-quote-modal__button'
					type='primary'
					onClick={handleClose}
				>
					{isLoading ? 'Cancel' : 'Close'}
				</Button>
			}
			classNames={{
				header: 'author-quote-modal__header',
				content: 'author-quote-modal__content',
				footer: 'author-quote-modal__footer'
			}}
			open={isOpen}
			closable={false}
			className='author-quote-modal'
		>
			{dataKeys.map((key, index) => {
				return (
					<div key={key}>
						Step {index + 1}: Requesting {key}...
						{data[key].isLoading ? '' : ' Completed'}
					</div>
				);
			})}
		</Modal>
	);
};
