import { z } from "zod";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNoteStore } from "../store/store.js";

const CreateNote = () => {
	const navigate = useNavigate();
	const [preview, setPreview] = useState(null);
	const imageRef = useRef();
	const { isLoading, error, createNote } = useNoteStore();

	const noteSchema = z.object({
		title: z
			.string()
			.min(1, { message: "Please enter a title." })
			.max(30, { message: "Title should be at most 10 characters." }),
		description: z.string().min(10, {
			message: "Please enter a description, at least 10 characters.",
		}),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(noteSchema) });

	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		} else {
			setPreview(null);
		}
	};
	const handleImageClear = () => {
		if (imageRef.current) {
			imageRef.current.value = null;
		}
		setPreview(null);
	};

	const handleCreate = async (data) => {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("image", imageRef.current.files[0]);
		try {
			const response = await createNote(formData);
			if (response && response.message) {
				toast.success(response.message);
				navigate("/");
			}
		} catch (err) {
			toast.error(err.response.data.message);
		}
	};

	return (
		<motion.div
			initial={{ y: 20, scale: 0.8, opacity: 0 }}
			animate={{ y: 0, scale: 1, opacity: 1 }}
			transition={{ duration: 0.3, delay: 0.2 }}
			className='mx-3 mt-3'>
			<h2 className='text-2xl text-center'>Create your note here </h2>
			<form
				className='max-w-2xl mx-auto flex flex-col items-center p-6 bg-gray-50 shadow-md rounded-lg'
				onSubmit={handleSubmit(handleCreate)}>
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
				{/* Image Input */}
				<div>
					<div className=' flex justify-between font-medium items-center'>
						Upload Image
						<p className='font-light text-xs'>opational</p>
					</div>
					{preview && (
						<div
							className='flex justify-end text-java-500'
							onClick={handleImageClear}>
							Clear
						</div>
					)}

					<input
						type='file'
						id='image'
						accept='image/*'
						ref={imageRef}
						onChange={(e) => {
							handleImageChange(e);
						}}
						className='border p-2 mt-1 block w-full'
					/>
					{errors.image && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.image.message}
						</p>
					)}
				</div>
				{/* Image Preview */}
				{preview && (
					<div className='max-w-xl'>
						<p className='font-medium text-center'>
							Image Preview:
						</p>
						<img
							src={preview}
							alt='Preview'
							className='h-96 object-cover shadow-md mt-2'
						/>
					</div>
				)}
				<div className='w-full flex justify-end'>
					<button
						type='submit'
						className='mt-4 px-6 py-2 bg-java-500 text-white font-semibold rounded hover:bg-java-600 focus:outline-none focus:ring-2 focus:ring-java-500 transition duration-150 ease-in-out'>
						{isLoading ? "Loading..." : "Submit"}
					</button>
				</div>
			</form>
		</motion.div>
	);
};

export default CreateNote;
