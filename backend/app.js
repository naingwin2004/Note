import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

import { connectDB } from "./db/connectDB.js";
import noteRoute from "./routes/note.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // allow us to parse incomming requests : req.body
app.use(cors()); //Enable cors
app.use("/backend/uploads", express.static(path.join(__dirname, "uploads")));

app.use(noteRoute);

app.listen(PORT, () => {
	connectDB();
	console.log("Sever is running on port :", PORT);
});
