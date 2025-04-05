import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

async function uploadToCloudinary(req) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path, {
      folder: "Mapify",
    })
    .catch((error) => {
      console.log(error);
     });
  return uploadResult.secure_url;
}

export default uploadToCloudinary;