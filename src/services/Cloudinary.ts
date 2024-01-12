// import path from 'path'
// import { fileURLToPath } from 'url'
// import dotenv from 'dotenv'
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
// dotenv.config({ path: path.join(__dirname, '../config/.env') })
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dzetmtyah",
  api_key: "844513678881661",
  api_secret: "WruvKFt4rmj6yuUg1hfZ6s9CLwk",
  secure: true,
});

export default cloudinary.v2;
