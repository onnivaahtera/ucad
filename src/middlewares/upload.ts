import multer from 'multer';
// multer configuration
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (_req, file, cb) => {
    // allow only images and videos
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      // accept file
      cb(null, true);
    } else {
      const error = Object.assign(
        new Error('Only images and videos are allowed!'),
        {status: 400},
      );
      cb(error);
    }
  },
});
export default upload;
