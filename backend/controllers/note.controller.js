import mongoose from "mongoose";

import { unlink } from "../utils/unlink.js";
import { Note } from "../model/note.model.js";

export const getNotes = async (req, res, next) => {
	const pageNumber = +req.query.page || 1;
	const note_par_page = 10;
	const skip = (pageNumber - 1) * note_par_page;
	try {
		const totalNote = await Note.find().countDocuments();
		const notes = await Note.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(note_par_page);
		return res.status(200).json({
			notes,
			totalNote,
			totalPage: Math.ceil(totalNote / note_par_page),
		});
	} catch (error) {
		console.log("Error in getNotes : ", error);
		return res.status(500).json({ message: error.message });
	}
};

export const createNote = async (req, res, next) => {
	const { title, description } = req.body;
	const image = req.file;

	if (!title && !description) {
		return res
			.status(422)
			.json({ message: "titel and description are required" });
	}
	// multerConfig sent => req.fileValadationError
	if (req.fileValadationError) {
		return res.status(422).json({ message: "Invalid image type" });
	}

	try {
		const note = new Note({
			title,
			description,
			imageUrl: image ? image.path : undefined,
			user: req.user.userId,
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

	//Mongodb ObjectId check
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: "Invalid Note ID" });
	}

	try {
		const note = await Note.findById(id);
		if (!note) {
			return res.status(404).json({ message: "Note not found" });
		}

		if (note.user.toString() !== req.user.userId) {
			return res.status(400).json({ message: "You aren't authorized" });
		}
		await Note.findByIdAndDelete(id);
		if (note.imageUrl) {
			unlink(note.imageUrl);
		}
		return res.status(202).json({ message: "Note delete successfully" });
	} catch (error) {
		console.log("Error in deleteNote: ", error);
		return res.status(500).json({ message: error.message });
	}
};

export const oldNoteData = async (req, res, next) => {
	const { id } = req.params;

	//Mongodb ObjectId check
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: "Invalid Note ID" });
	}

	try {
		const note = await Note.findById(id);
		if (!note) {
			return res.status(404).json({ message: "Note not found" });
		}
		if (note.user.toString() !== req.user.userId) {
			return res.status(400).json({ message: "You aren't authorized" });
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
	const image = req.file;

	if (!title && !description) {
		return res
			.status(422)
			.json({ message: "titel and description are required" });
	}

	//Mongodb ObjectId check
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: "Invalid ID format" });
	}

	// multerConfig sent => req.fileValadationError
	if (req.fileValadationError) {
		return res.status(422).json({ message: "Invalid image type" });
	}

	try {
		const note = await Note.findById(id);

		if (!note) {
			return res.status(404).json({ message: "Note not found" });
		}
		if (note.user.toString() !== req.user.userId) {
			return res.status(400).json({ message: "You aren't authorized" });
		}
		note.title = title;
		note.description = description;

		if (image) {
			if (note.imageUrl) {
				unlink(note.imageUrl);
			}
			note.imageUrl = image.path;
		}
		await note.save();
		return res
			.status(201)
			.json({ message: "Note updated successfully", note });
	} catch (error) {
		console.log("Error in updateNote: ", error);
		return res.status(500).json({ message: error.message });
	}
};
