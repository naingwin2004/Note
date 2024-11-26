import { useEffect } from "react";
import toast from "react-hot-toast";
import { formatISO9075, parseISO } from "date-fns";
import { NotebookPen, Trash2 } from "lucide-react";
import { LoaderCircle, CornerUpLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useNoteStore } from "../store/store.js";
import { useAuthStore } from "../store/auth.store.js";

const NoteDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { note, isLoading, error, detailsNote, deleteNote } = useNoteStore();
	const { user } = useAuthStore();

	const handleDelete = async () => {
		try {
			const response = await deleteNote(note._id);
			if (response && response.message) {
				toast.success(response.message);
				navigate("/");
			}
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		detailsNote(id);
	}, [detailsNote]);

	if (!note || isLoading) {
		return (
			<div className='flex justify-center items-center mt-[50%]'>
				<LoaderCircle className='w-20 h-20 animate-spin' />
			</div>
		);
	}

	const formattedDate = note.createdAt
		? formatISO9075(parseISO(note.createdAt), { representation: "date" })
		: "Invalid Date";

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
				<p>{formattedDate}</p>
				{note.imageUrl && (
					<img
						src={`http://localhost:8000/${note.imageUrl}`}
						alt='Note image'
						className='mx-auto max-w-full max-h-96 object-cover my-2'
					/>
				)}
				{user && note.user && note.user === user._id && (
					<div className='flex justify-end space-x-4'>
						<Link to={`/edit/${note._id}`}>
							<NotebookPen className='w-6 h-6 cursor-pointer text-java-500 hover:text-java-700' />
						</Link>
						<Trash2
							className='w-6 h-6 cursor-pointer text-red-400 hover:text-red-700'
							onClick={handleDelete}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default NoteDetails;
