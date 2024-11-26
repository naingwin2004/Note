import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/auth.store.js";
const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showPassword, setShowPassword] = useState(false);

	const { registerAcc } = useAuthStore();
	const navigate= useNavigate()

	const onSubmit = async (data) => {
		const { email, password, userName } = data;
		try {
			const response = await registerAcc(userName, email, password);
			await toast.success(response.message);
			navigate("/");
		} catch (err) {
			toast.error(err?.response?.data?.message || "Error Register");
			console.log("Error in Register,", err);
		}
	};

	return (
		<div className='h-[80vh] flex justify-center items-center bg-java-50 mx-3'>
			<div className='p-8 bg-white rounded-lg shadow-lg max-w-sm w-full'>
				<h2 className='text-2xl font-bold text-center mb-6'>
					Register
				</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-4'>
						<label className='block mb-2 text-java-800'>
							Username
						</label>
						<input
							type='text'
							{...register("userName")}
							className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-java-400 '
						/>
						{errors.username && (
							<p className='text-red-500 text-sm'>
								{errors.username.message}
							</p>
						)}
					</div>
					<div className='mb-4'>
						<label className='block mb-2 text-java-800'>
							Email
						</label>
						<input
							type='email'
							{...register("email")}
							className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-java-400 '
						/>
						{errors.email && (
							<p className='text-red-500 text-sm'>
								{errors.email.message}
							</p>
						)}
					</div>
					<div className='mb-4'>
						<label className='block mb-2 text-java-800'>
							Password
						</label>
						<div className='relative'>
							<input
								type={showPassword ? "text" : "password"}
								{...register("password")}
								className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-java-400 pr-10 '
							/>
							<span
								onClick={() => setShowPassword(!showPassword)}
								className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-java-600'>
								{showPassword ? (
									<EyeOff size={20} />
								) : (
									<Eye size={20} />
								)}
							</span>
						</div>
						{errors.password && (
							<p className='text-red-500 text-sm'>
								{errors.password.message}
							</p>
						)}
					</div>
					<button
						type='submit'
						className='w-full bg-java-500 text-white p-2 rounded-lg hover:bg-java-600'>
						Register
					</button>
				</form>
				<div className='mt-4 text-center'>
					<p>
						Already have an account?
						<Link
							to={"/login"}
							className='text-java-600 hover:underline'>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
