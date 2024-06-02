import multer from "multer";

async function checkFileType(file, callback) {
  const filetypes = /jpeg|jpg|png|svg|glb/;
  const extname = filetypes.test(file.originalname.toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  } else {
    return callback(new Error("Error: Images Only!"));
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
});
