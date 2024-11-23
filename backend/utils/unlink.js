import fs from "fs";

export const unlink = (filePath) => {
	fs.unlink(filePath, (err) => {
		if (err) throw err;
		console.log("unlink file ok !");
	});
};
