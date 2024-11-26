import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxLength: 30,
		},
		description: {
			type: String,
			required: true,
			minLength: 10,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		imageUrl: String,
	},
	{ timestamps: true },
);

export const Note = mongoose.model("Note", noteSchema);
