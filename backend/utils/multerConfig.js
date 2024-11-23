import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "backend/uploads"); // Ensure 'uploads' folder exists
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + "-" + file.originalname);
	},
});

const  fileFilter =(req, file, cb) =>{
	if (!file) {
		// No file uploaded, so no error
		cb(null, true);
	} else {
		const imgType =
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg" ||
			file.mimetype === "image/jpeg";
		if (imgType) {
			cb(null, true); // Valid file type
		} else {
			req.fileValadationError = "Invalid file type";
			cb(null, false); // Invalid file type
		}
	}
}

const upload = multer({ storage, fileFilter });

export default upload;
