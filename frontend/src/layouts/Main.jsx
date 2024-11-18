import { Outlet, Link } from "react-router-dom";

import { NavBar, FloatBtn } from "../components/index.js";

const Main = () => {
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
