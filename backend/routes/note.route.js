import express from "express";

import upload from "../utils/multerConfig.js";
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

router.post("/create", upload.single("image"), createNote);

router.get("/details/:id", detailsNote);

router.delete("/delete/:id", deleteNote);

router.get("/edit/:id", oldNoteData);
router.post("/edit/:id",upload.single("image"), updateNote);

export default router;
