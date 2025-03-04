import { User } from '../../@types';
import { AuthorQuote, AuthorQuoteModal, UserCard } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { useAuthorQuote } from '../../hooks/useAuthorQuote';

const Profile = () => {
	const user = useAuth().user as User;

	const { data, showModal, handleOpenModal, closeModal, handleCancel } = useAuthorQuote();

	return (
		<section className='profile'>
			<UserCard user={user} handleUpdateQuote={handleOpenModal} />

			<AuthorQuoteModal
				data={data}
				onClose={closeModal}
				onCancel={handleCancel}
				isOpen={showModal}
			/>

			<AuthorQuote data={data} />
		</section>
	);
};

export default Profile;
