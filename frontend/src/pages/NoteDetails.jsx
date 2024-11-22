import { useEffect } from "react";
import toast from "react-hot-toast";
import { NotebookPen, Trash2 } from "lucide-react";
import { LoaderCircle, CornerUpLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useNoteStore } from "../store/store.js";

const NoteDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { note, isLoading, error, detailsNote, deleteNote } = useNoteStore();

	const handleDelete = async () => {
		try {
			const response = await deleteNote(note._id);
			if (response && response.message) {
				toast.success(response.message);
				navigate("/");
			}
		} catch (error) {
			toast.error("Failed to delete the note.");
		}
	};

	useEffect(() => {
		detailsNote(id);
	}, [detailsNote]);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center mt-[50%]'>
				<LoaderCircle className='w-20 h-20 animate-spin' />
			</div>
		);
	}
	if (error) {
		return (
			<div className='flex items-center mt-[50%] max-w-sm justify-center mx-auto'>
				<p className='mx-3'>{error}</p>
				<p
					className='border border-java-300 px-5 py-2 mx-3 rounded hover:bg-java-200'
					onClick={() => navigate("/")}>
					Go back home
				</p>
			</div>
		);
	}
	return (
		<div className='flex justify-center items-center my-10 flex-col gap-3'>
			<p
				className='self-end border border-java-300 px-5 py-2 mx-3 rounded hover:bg-java-200'
				onClick={() => navigate(-1)}>
				<CornerUpLeft className='w-5 h-5' />
			</p>
			<div className='max-w-lg  p-6 rounded-lg shadow-md mx-3 border border-java-300 bg-white'>
				<h2 className='text-java-900 text-lg font-semibold mb-2'>
					{note.title}
				</h2>
				<p className='text-java-600 mb-4'>{note.description}</p>
				{note.imageUrl && (
					<img src={`http://localhost:8000/${note.imageUrl}`} />
				)}
				<div className='flex justify-end space-x-4'>
					<Link to={`/edit/${note._id}`}>
						<NotebookPen className='w-6 h-6 cursor-pointer text-java-500 hover:text-java-700' />
					</Link>
					<Trash2
						className='w-6 h-6 cursor-pointer text-red-400 hover:text-red-700'
						onClick={handleDelete}
					/>
				</div>
			</div>
		</div>
	);
};

export default NoteDetails;
