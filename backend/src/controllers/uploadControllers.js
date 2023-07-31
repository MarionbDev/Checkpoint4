const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/assets/drawings"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-drawing-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadDrawingImage = (req, res, next) => {
  upload.single("drawingImage")(req, res, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      req.body.image = req.file.filename;
      next();
    }
  });
};

// const uploadAvatar = (req, res, next) => {
//   upload.single("avatarImage")(req, res, (err) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500);
//     } else {
//       req.body.image = req.file.filename;
//       next();
//     }
//   });
// };

module.exports = { uploadDrawingImage };
