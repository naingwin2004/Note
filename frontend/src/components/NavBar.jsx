import { Link } from "react-router-dom";
import { NotepadText } from "lucide-react";

const NavBar = () => {
	return (
		<div className='bg-java-50 px-2 py-3'>
			<Link>
				<div className='flex items-center gap-1 hover:underline hover:text-java-700 cursor-pointer'>
					<NotepadText className='w-6 h-6 cursor-pointer text-java-500 hover:text-java-700' />
					<h1 className='text-java-950'>Sharenote</h1>
				</div>
			</Link>
		</div>
	);
};

export default NavBar;
