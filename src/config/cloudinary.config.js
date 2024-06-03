import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config();

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

function uploadImage(localFilePath, fileName) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      localFilePath,
      { public_id: fileName },
      (err, result) => {
        if (err) {
          fs.unlinkSync(localFilePath);
          reject(err);
        } else {
          fs.unlinkSync(localFilePath);
          resolve(result);
        }
      }
    );
  });
}

export default uploadImage;
