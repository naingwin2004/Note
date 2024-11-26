import { useAuthStore } from "../store/auth.store.js";

const Profile = () => {
	const { user } = useAuthStore();

	return (
		<div className='flex flex-col items-center mt-3'>
			{!user && (
				<p className='bg-java-100 mx-3 px-3 py-2 rounded shadow-lg shadow-emerald-200'>
					Bro really, Why are you here! your are not login!!!
				</p>
			)}
			{user && (
				<div className='bg-java-100 mx-3 px-3 py-2 rounded shadow-lg shadow-emerald-200'>
					<p>username : {user.userName}</p>
					<p>email : {user.email}</p>
				</div>
			)}
		</div>
	);
};

export default Profile;
