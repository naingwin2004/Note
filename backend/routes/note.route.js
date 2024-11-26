import express from "express";
import { authenticate } from "../middleware/authenticate.js";

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

router.post("/create",authenticate, upload.single("image"), createNote);

router.get("/details/:id", detailsNote);

router.delete("/delete/:id",authenticate, deleteNote);

router.get("/edit/:id",authenticate, oldNoteData);
router.post("/edit/:id",authenticate, upload.single("image"), updateNote);

export default router;
