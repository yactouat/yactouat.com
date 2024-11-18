import multer from 'multer';

// configure multer disk storage
const storage = multer.diskStorage({
    // set the destination folder for uploaded files
    destination: (req, file, cb) => {
        // store files in the tmp/ directory,
        // the `null` parameter is used to indicate that there were no errors
        cb(null, 'tmp/');
    },
    // set the filename for uploaded files
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const uploadMiddleware = multer({
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/x-icon'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`unsupported file type: ${file.mimetype}`));
            return;
        }
    },
    limits: {
        files: 1, // only one file to be uploaded at a time
        fileSize: 50 * 1024 // 50KB limit (most PNGs are under 10KB, and they'll probably be the heaviest files for now)
    },
    storage: storage
}).fields([
    { name: 'favicon', maxCount: 1 }
]);

export default uploadMiddleware;