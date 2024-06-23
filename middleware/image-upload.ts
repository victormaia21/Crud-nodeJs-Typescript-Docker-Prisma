import { Request } from "express";
import multer from "multer";
import path from "path";

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req:Request, file:Express.Multer.File, cb) { 
    cb(null, `public/img`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|webp)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(null, true);
  },
});

export { imageUpload };
