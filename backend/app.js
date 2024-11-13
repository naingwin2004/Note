import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // allow us to parse incomming requests : req.body

app.get("/", (req, res) => {
	res.json({ message: "something" });
});

app.listen(PORT,() => {
	connectDB();
	console.log("Sever is running on port :", PORT);
});
