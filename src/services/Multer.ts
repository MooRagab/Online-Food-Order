import multer from "multer";

export const fileValidation = {
  image: ["image/png", "image/jpeg", "image/jif"],
  pdf: ["application/pdf"],
};

export function myMulter(customValidation = fileValidation.image) {
  const storage = multer.diskStorage({});
  function fileFilter(req, file: any, cb: any) {
    if (!customValidation.includes(file.mimetype)) {
      cb("In-valid format", false);
    } else {
      cb(null, true);
    }
  }

  const upload = multer({ fileFilter, storage });
  return upload;
}
