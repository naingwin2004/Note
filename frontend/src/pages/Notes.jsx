
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { LoaderCircle } from "lucide-react";

import { Card } from "../components/index.js";
import { useNoteStore } from "../store/store.js";

const Notes = () => {
	const { notes, error, isLoading, fetchNotes } = useNoteStore();

	useEffect(() => {
		fetchNotes();
	}, [fetchNotes]);

	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1,
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center mt-[50%]'>
				<LoaderCircle className='w-20 h-20 animate-spin' />
			</div>
		);
	}

	return (
		<div className='m-3'>
			{notes.length === 0 ? (
				<div className='flex flex-col gap-3'>
					<p>No note</p>
					<Link to={"/create"}>
						<p className='cursor-pointer bg-java-600 hover:bg-java-700 text-white p-2 inline'>
							Create note now
						</p>
					</Link>
				</div>
			) : (
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className='my-masonry-grid'
					columnClassName='my-masonry-grid_column'>
					{notes.map((note) => (
						<Card
							key={note._id}
							note={note}
						/>
					))}
				</Masonry>
			)}
		</div>
	);
};

export default Notes;
