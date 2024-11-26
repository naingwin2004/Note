import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({ message: "No token provided" });
		}

		const token = authHeader.split(" ")[1]; // Bearer <token>
		if (!token) {
			return res.status(401).json({ message: "Token missing" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.error("Error in authenticate", error.message);

		if (error.name === "TokenExpiredError") {
			return res
				.status(401)
				.json({ message: "Token expired, please log in again",tokenExpired:true });
		}

		return res.status(401).json({ message: "Un-Authorized" });
	}
};
