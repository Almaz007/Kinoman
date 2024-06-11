import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('uploads/movieImages')) {
			fs.mkdirSync('uploads/movieImages');
		}
		cb(null, 'uploads/movieImages');
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
