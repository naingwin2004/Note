import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { NotebookPen, Trash2, ScanEye } from "lucide-react";

import { useNoteStore } from "../store/store.js";
import { useAuthStore } from "../store/auth.store.js";

const Card = ({ note }) => {
	const { deleteNote } = useNoteStore();
	const { user } = useAuthStore();

	const handleDelete = async () => {
		try {
			const response = await deleteNote(note._id);
			if (response && response.message) {
				toast.success(response.message);
			}
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				layout
				initial={{ y: 20, scale: 0.8, opacity: 0 }}
				animate={{ y: 0, scale: 1, opacity: 1 }}
				exit={{ scale: 0.5, opacity: 0 }}
				transition={{ duration: 0.3, delay: 0.2 }}
				className='p-6 rounded-lg shadow-md mx-2 border border-java-300 bg-white'>
				<h2 className='text-java-900 text-lg font-semibold mb-2'>
					{note.title}
				</h2>
				<p className='text-java-600 mb-4'>{note.description}</p>
				<p>
					{formatISO9075(new Date(note.createdAt), {
						representation: "date",
					})}
				</p>
				<div className='flex justify-end space-x-4'>
					{user && note.user && note.user === user._id && (
						<>
							<Link to={`/edit/${note._id}`}>
								<NotebookPen className='w-6 h-6 cursor-pointer text-java-500 hover:text-java-700' />
							</Link>
							<Trash2
								className='w-6 h-6 cursor-pointer text-red-400 hover:text-red-700'
								onClick={handleDelete}
							/>
						</>
					)}

					<Link to={`/details/${note._id}`}>
						<ScanEye className='w-6 h-6 cursor-pointer hover:text-java-700' />
					</Link>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Card;
