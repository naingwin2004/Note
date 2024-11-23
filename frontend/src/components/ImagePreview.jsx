import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema definition
const schema = z.object({
	image: z
		.custom((value) => value instanceof File, {
			message: "Please upload a valid image file.",
		})
		.optional(),
});

const ImagePreview = () => {
	const [preview, setPreview] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data) => {
		console.log("Form Data:", data);
	};

	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		} else {
			setPreview(null);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4'>
			{/* Image Input */}
			<div>
				<label
					htmlFor='image'
					className='block font-medium'>
					Upload Image
				</label>
				<input
					type='file'
					id='image'
					accept='image/*'
					{...register("image")}
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
				<div>
					<p className='font-medium'>Image Preview:</p>
					<img
						src={preview}
						alt='Preview'
						className='w-full h-full object-cover mt-2'
					/>
				</div>
			)}
		</form>
	);
};

export default ImagePreview;
