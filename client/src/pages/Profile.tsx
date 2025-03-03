import { useAuth } from '../hooks/useAuth';
import { useAuthorQuote } from '../hooks/useAuthorQuote';
import { AuthorQuote, AuthorQuoteModal } from '../components';

export const Profile = () => {
	const { user, isLoading } = useAuth();

	const { data, showModal, openModal, closeModal, handleCancel } = useAuthorQuote();

	if (isLoading) return <p>Loading...</p>;

	return (
		<div>
			<h1>Welcome, {user?.fullname}</h1>

			<button onClick={() => openModal()}>Update</button>

			<AuthorQuoteModal
				data={data}
				onClose={closeModal}
				onCancel={handleCancel}
				isOpen={showModal}
			/>

			<AuthorQuote data={data} />
		</div>
	);
};
