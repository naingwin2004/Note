import { z } from "zod";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";

import { useNoteStore } from "../store/store.js";

const EditNote = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { oldNoteData, isLoading, error, oldFormData, updateNote } =
		useNoteStore();

	const noteSchema = z.object({
		title: z
			.string()
			.min(1, { message: "Please enter a title." })
			.max(10, { message: "Title should be at most 10 characters." }),
		description: z.string().min(10, {
			message: "Please enter a description, at least 10 characters.",
		}),
	});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ resolver: zodResolver(noteSchema) });

	const fetchData = async () => {
		try {
			const response = await oldNoteData(id);
			if (response) {
				setValue("title", response.title);
				setValue("description", response.description);
			}
		} catch (error) {
			console.log("Somthing went wrong");
		}
	};

	useEffect(() => {
		fetchData();
	}, [oldNoteData]);

	const handleEdit = async (data) => {
		try {
			const response = await updateNote(id, data.title, data.description);
			if (response && response.message) {
				toast.success(response.message);
				navigate("/");
			}
		} catch (error) {
			toast.error(message);
		}
	};

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
		<motion.div
			initial={{ y: 20, scale: 0.8, opacity: 0 }}
			animate={{ y: 0, scale: 1, opacity: 1 }}
			transition={{ duration: 0.3, delay: 0.2 }}
			className='mx-3 mt-3'>
			<h2 className='text-2xl text-center'>Edit your note here </h2>
			<form
				className='max-w-2xl mx-auto flex flex-col items-center p-6 bg-gray-50 shadow-md rounded-lg'
				onSubmit={handleSubmit(handleEdit)}>
				<div className='w-full'>
					<label
						htmlFor='title'
						className='block text-gray-700 font-medium mb-2'>
						Title
					</label>
					<input
						{...register("title")}
						type='text'
						name='title'
						id='title'
						placeholder='Enter the title...'
						className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-java-500 focus:border-java-500 transition duration-150 ease-in-out'
					/>
					{errors.title && (
						<p className='text-sm text-red-500 mt-1'>
							{errors.title.message}
						</p>
					)}
				</div>
				<div className='w-full mb-4'>
					<label
						htmlFor='description'
						className='block text-gray-700 font-medium mb-2'>
						Description
					</label>
					<textarea
						{...register("description")}
						name='description'
						id='description'
						placeholder='Enter the description...'
						className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-java-500 focus:border-java-500 transition duration-150 ease-in-out'
						rows='4'
					/>
					{errors.description && (
						<p className='text-sm text-red-500 mt-1'>
							{errors.description.message}
						</p>
					)}
				</div>
				<div className='w-full flex justify-end'>
					<button
						type='submit'
						className='mt-4 px-6 py-2 bg-java-500 text-white font-semibold rounded hover:bg-java-600 focus:outline-none focus:ring-2 focus:ring-java-500 transition duration-150 ease-in-out'>
						Update
					</button>
				</div>
			</form>
		</motion.div>
	);
};

export default EditNote;
