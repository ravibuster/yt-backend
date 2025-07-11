import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp"); // Specify the directory to store uploaded files
  },
  filename: (req, file, cb) => {  
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname); // Create a unique filename
  }
});

const upload = multer({ storage });

export { upload };