import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('uploads/profileImages')) {
			fs.mkdirSync('uploads/profileImages');
		}
		cb(null, 'uploads/profileImages');
	},
	filename: (_, file, cb) => {
		let origFileName = file.originalname.split('.')[0];
		let filename = file.originalname;
		// origFileName + '-' + Date.now() + path.extname(file.originalname);
		return cb(null, filename);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

export default multer({ storage, fileFilter });
