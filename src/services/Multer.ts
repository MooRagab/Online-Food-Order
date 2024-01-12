import multer from "multer";

export const fileValidation = {
  image: ["image/png", "image/jpeg", "image/jif"],
  pdf: ["application/pdf"],
} as any;

export function myMulter(customValidation = fileValidation.image) {
  const storage = multer.diskStorage({});
  function fileFilter(req: any, file: any, cb: any) {
    cb(null, true);
  }

  const upload = multer({ fileFilter, storage });
  return upload;
}
