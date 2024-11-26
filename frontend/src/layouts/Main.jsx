import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";

import { NavBar, FloatBtn } from "../components/index.js";
import { useAuthStore } from "../store/auth.store.js";

const Main = () => {
	const { initializeAuth } = useAuthStore();
	useEffect(() => {
		initializeAuth();
	}, []);
	return (
		<div className='flex flex-col'>
			<NavBar />
			<main>
				<Outlet />
				<Link to='/create'>
					<FloatBtn />
				</Link>
			</main>
		</div>
	);
};

export default Main;
