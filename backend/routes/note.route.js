import express from "express";
import { body } from "express-validator";

import {
	createNote,
	getNotes,
	detailsNote,
	deleteNote,
	oldNoteData,
	updateNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.get("/notes", getNotes);

router.post(
	"/create",
	[
		body("title")
			.notEmpty()
			.withMessage("Title is required")
			.isLength({ max: 30 })
			.withMessage("Title must be 30 characters."),
		body("description")
			.notEmpty()
			.withMessage("Description is required")
			.isLength({ min: 10 })
			.withMessage("Description must be at least 10 characters long."),
	],
	createNote,
);

router.get("/details/:id", detailsNote);

router.delete("/delete/:id", deleteNote);

router.get("/edit/:id", oldNoteData);
router.post("/edit/:id", updateNote);

export default router;
