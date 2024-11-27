import { useAuthStore } from "../store/auth.store.js";
import { motion } from "framer-motion";
import { formatISO9075 } from "date-fns";

const Profile = () => {
	const { user } = useAuthStore();
	console.log(user);

	return (
		<div className='flex flex-col items-center mt-3'>
			{!user && (
				<p className='bg-java-100 mx-3 px-3 py-2 rounded shadow-lg shadow-emerald-200'>
					Bro really, Why are you here! your are not login!!!
				</p>
			)}
			{user && (
				<motion.div
					initial={{ y: 50, scale: 0.8, opacity: 0 }}
					animate={{ y: 0, scale: 1, opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.2 }}
					className='shadow-lg w-80 rounded-lg p-6 border border-java-200 ring ring-java-100'>
					<div>
						<div className='flex items-center space-x-4 mb-4'>
							<div>
								<h3 className='text-lg font-bold text-gray-800'>
									{user.userName}
								</h3>
								<p className='text-sm text-gray-500'>
									{user.email}
								</p>
							</div>
						</div>
						<p className='text-gray-600 text-sm'>
							createdAt :{" "}
							<span className='font-medium'>
								{formatISO9075(new Date(user.createdAt))}
							</span>
						</p>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default Profile;
