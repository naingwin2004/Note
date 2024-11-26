import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "./auth.store.js";

export const useNoteStore = create((set) => ({
	notes: [],
	note: {},
	isLoading: false,
	error: null,
	message: null,
	oldFormData: {},
	totalPage: 0,
	currentPage: 1,

	setCurrentPage: (page) => set({ currentPage: page }),

	fetchNotes: async (page = 1) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/notes?page=${page}`,
			);
			set({
				notes: response.data.notes,
				isLoading: false,
				error: null,
				totalPage: response.data.totalPage,
				currentPage: page, // update currentPage here
			});
		} catch (error) {
			console.error("Error fetching notes:", error);
			set({
				error: error?.response?.data?.message || "Error fetching notes",
				isLoading: false,
			});
			throw error;
		}
	},

	createNote: async (formData) => {
		set({ isLoading: true, error: null });
		try {
			const token = useAuthStore.getState().token;
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/create`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			set({
				message: response.data.message,
				isLoading: false,
			});
			return response.data;
		} catch (error) {
			console.error("Error createNote:", error);
			set({
				error: error?.response?.data?.message || "Error createNote",
				isLoading: false,
			});
			throw error;
		}
	},

	detailsNote: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/details/${id}`,
			);
			set({ note: response.data, isLoading: false });
			return response.data;
		} catch (error) {
			console.error("Error detailsNote :", error);
			set({
				error: error?.response?.data?.message || "Error detailsNote",
				isLoading: false,
			});
			throw error;
		}
	},

	deleteNote: async (id) => {
		set({ error: null, message: null });
		try {
			const token = useAuthStore.getState().token;
			const response = await axios.delete(
				`${import.meta.env.VITE_API_URL}/delete/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			set((state) => ({
				notes: state.notes.filter((note) => note._id !== id),
				message: response.data.message || "Note delete successfully",
			}));
			return response.data;
		} catch (error) {
			console.error("Error deleteNote :", error);
			set({
				error: error?.response?.data?.message || "Error deleteNote",
				isLoading: false,
			});
			throw error;
		}
	},

	oldNoteData: async (id) => {
		set({ oldFormData: {}, isLoading: true, error: null });
		try {
			const token = useAuthStore.getState().token;
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/edit/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			set({ oldFormData: response.data, isLoading: false });

			return response.data;
		} catch (error) {
			console.error("Error oldNoteData :", error);
			set({
				error: error?.response?.data?.message || "Error oldNoteData",
				isLoading: false,
			});
			throw error;
		}
	},

	updateNote: async (id, formData) => {
		set({ message: null, isLoading: true, error: null });

		try {
			const token = useAuthStore.getState().token;
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/edit/${id}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			set((state) => ({
				notes: state.notes.map((note) =>
					note.id === id ? response.data.note : note,
				),
				message: response.data.message,
				isLoading: false,
			}));

			return response.data;
		} catch (error) {
			console.error("Error oldNoteData :", error);
			set({
				error: error?.response?.data?.message || "Error oldNoteData",
				isLoading: false,
			});
			throw error;
		}
	},
}));
