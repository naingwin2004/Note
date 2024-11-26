import { NavLink, useNavigate } from "react-router-dom";
import { NotepadText } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/auth.store.js";

const NavBar = () => {
	const { isAuthenticated, logout, isLogout } = useAuthStore();
	const navigate = useNavigate();

	// Monitor isLogout state to trigger navigation
	useEffect(() => {
		if (isLogout) {
			toast.success("logout successfully")
			navigate("/");
		}
	}, [isLogout]);

	return (
		<div className='bg-java-50 px-2 py-3 flex justify-between items-center'>
			<NavLink to={"/"}>
				<div className='flex items-center gap-1 hover:underline hover:text-java-700 cursor-pointer'>
					<NotepadText className='w-6 h-6 cursor-pointer text-java-500 hover:text-java-700' />
					<h1 className='text-java-950'>Sharenote</h1>
				</div>
			</NavLink>

			<div className='flex gap-3 items-center'>
				{isAuthenticated ? (
					<>
						<NavLink
							to={"/profile"}
							className={({ isActive }) =>
								`text-java-950 hover:text-java-700 ${
									isActive ? "text-java-500 underline" : ""
								}`
							}>
							<h1>profile</h1>
						</NavLink>
						<div
							onClick={() => logout()}
							className='text-java-950 hover:text-java-700 cursor-pointer'>
							<h1>Logout</h1>
						</div>
					</>
				) : (
					<>
						<NavLink
							to={"/login"}
							className={({ isActive }) =>
								`text-java-950 hover:text-java-700 ${
									isActive ? "text-java-500 underline" : ""
								}`
							}>
							<h1>login</h1>
						</NavLink>
						<NavLink
							to={"/register"}
							className={({ isActive }) =>
								`text-java-950 hover:text-java-700 ${
									isActive ? "text-java-500 underline" : ""
								}`
							}>
							<h1>register</h1>
						</NavLink>
					</>
				)}
			</div>
		</div>
	);
};

export default NavBar;
