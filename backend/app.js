import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db/connectDB.js";
import noteRoute from "./routes/note.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // allow us to parse incomming requests : req.body
app.use(cors()) //Enable cors

app.use(noteRoute);

app.listen(PORT, () => {
	connectDB();
	console.log("Sever is running on port :", PORT);
});
