import axios from "axios";
import { create } from "zustand";

export const useNoteStore = create((set) => ({
	notes: [],
	note: {},
	isLoading: false,
	error: null,
	message: null,
	oldFormData: {},

	fetchNotes: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get("http://localhost:8000/notes");
			set({ notes: response.data, isLoading: false, error: null });
			return response.data;
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
			const response = await axios.post(
				"http://localhost:8000/create",
				formData,
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
				`http://localhost:8000/details/${id}`,
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
			const response = await axios.delete(
				`http://localhost:8000/delete/${id}`,
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
			const response = await axios.get(
				`http://localhost:8000/edit/${id}`,
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
			const response = await axios.post(
				`http://localhost:8000/edit/${id}`,
				formData,
			);
			set((state) => ({
				notes: state.notes.map((note) =>
					note.id === id ? { ...note, ...response.data.note } : note,
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
