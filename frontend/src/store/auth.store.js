import axios from "axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
	user: null,
	token: null,
	isLogout: false,
	isAuthenticated: false,

	login: async (email, password) => {
		set({ token: null, user: null });
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/login`,
				{
					email,
					password,
				},
			);
			const token = response.data.token;
			const user = response.data.user;
			localStorage.setItem("authToken", token);
			localStorage.setItem("loginUser", JSON.stringify(user));
			set({
				token,
				user: response.data.user,
				isAuthenticated: true,
			});
			return response.data;
		} catch (error) {
			console.log("Error login:", error);
			set({
				error: error?.response?.data?.message || "Error login",
				isAuthenticated: false,
			});
			throw error;
		}
	},

	registerAcc: async (userName, email, password) => {
		set({ token: null, user: null });
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/register`,
				{
					userName,
					email,
					password,
				},
			);
			const token = response.data.token;
			const user = response.data.user;
			localStorage.setItem("authToken", token);
			localStorage.setItem("loginUser", JSON.stringify(user));
			set({
				token,
				user,
				isAuthenticated: true,
			});
			return response.data;
		} catch (error) {
			console.log("Error register:", error);
			set({
				error: error?.response?.data?.message || "Error register",
				isAuthenticated: false,
			});
			throw error;
		}
	},
	logout: () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("loginUser");
		set({
			token: null,
			user: null,
			isLogout: true,
			isAuthenticated: false,
		});
	},

	initializeAuth: () => {
		const token = localStorage.getItem("authToken");

		const user = JSON.parse(localStorage.getItem("loginUser"));
		if (token && user) {
			set({ token, user, isAuthenticated: true });
		}
	},
}));
