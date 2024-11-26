import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/auth.model.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req, res, next) => {
	const { email, password, userName } = req.body;

	if (!email || !password || !userName) {
		return res.status(400).json({ message: "All fields are required" });
	}
	if (!emailPattern.test(email)) {
		return res.status(400).json({ message: "Invalid email" });
	}
	if (password.length < 6) {
		return res
			.status(400)
			.json({ message: "password must be aleast 6 character long" });
	}

	try {
		const userAlreadyExisted = await User.findOne({ email });
		if (userAlreadyExisted) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashPassword = await bcryptjs.hash(password, 10);
		const user = new User({
			email,
			password: hashPassword,
			userName,
		});
		await user.save();
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		return res.status(201).json({
			message: "User Created Successfully",
			token,
			user: { ...user._doc, password: undefined },
		});
	} catch (err) {
		console.log("Error in register ", err);
		res.status(500).json({ message: "Internet server error" });
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "All fields are required" });
	}

	if (!emailPattern.test(email)) {
		return res.status(400).json({ message: "Invalid email" });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const isMatch = await bcryptjs.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credential" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		return res.status(201).json({
			message: "Login Successfully",
			token,
			user: { ...user._doc, password: undefined },
		});
	} catch (err) {
		console.log("Error in login ", err);
		res.status(500).json({ message: "Internet server error" });
	}
};
