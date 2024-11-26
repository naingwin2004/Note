import fs from "fs/promises";

export const unlink = async (path) => {
	if (!path) {
		throw new Error('The "path" argument is required');
	}
	await fs.unlink(path);
};
