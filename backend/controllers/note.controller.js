import { Note } from "../model/note.model.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

export const getNotes = async (req, res, next) => {
	try {
		const notes = await Note.find().sort({ createdAt: -1 });
		return res.status(200).json(notes);
	} catch (error) {
		console.log("Error in getNotes : ", error);
		return res.status(500).json({ message: error.message });
	}
};

export const createNote = async (req, res, next) => {
	const { title, description } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({ message: "validation fail", errors: errors.array() });
	}
	try {
		const note = new Note({
			title,
			description,
		});
		await note.save();

		return res.status(201).json({ message: "Note created successfully" });
	} catch (error) {
		console.log("Error in createNote : ", error);
		return res.status(500).json({ message: error.message });
	}
};

export const detailsNote = async (req, res, next) => {
	const { id } = req.params;

	//Mongodb ObjectId check
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: "Invalid Note ID" });
	}

	try {
		const note = await Note.findById(id);
		if (!note) {
			return res.status(404).json({ message: "Note was not found" });
		}
		return res.status(200).json(note);
	} catch (error) {
		console.log("Error in detailsNote: ", error);
		return res.status(500).json({ message: error.message });
	}
};

export const deleteNote = async (req, res, next) => {
	const { id } = req.params;
	try {
		const note = await Note.findByIdAndDelete(id);
		if (!note) {
			return res.status(404).json({ message: "Note not found" });
		}
		return res.status(202).json({ message: "Note delete successfully" });
	} catch (error) {
		console.log("Error in deleteNote: ", error);
		return res.status(500).json({ message: error.message });
	}
};

export const oldNoteData = async (req, res, next) => {
	const { id } = req.params;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({ message: "validation fail", errors: errors.array() });
	}
	try {
		const note = await Note.findById(id);
		if (!note) {
			return res.status(404).json({ message: "Note not found" });
		}
		return res.status(200).json(note);
	} catch (error) {
		console.log("Error in oldNoteData: ", error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateNote = async (req, res, next) => {
	const { id } = req.params;
	const { title, description } = req.body;
	try {
		const note = await Note.findById(id);
		if (!note) {
			return res.status(404).json({ message: "Note not found" });
		}
		note.title = title;
		note.description = description;
		await note.save();
		return res
			.status(201)
			.json({ message: "Note updated successfully", note });
	} catch (error) {
		console.log("Error in updateNote: ", error);
		return res.status(500).json({ message: error.message });
	}
};
