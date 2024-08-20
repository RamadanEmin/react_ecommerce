import mongoose from 'mongoose';
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

export const connectDB = (uri: string) => {
    mongoose
        .connect(uri)
        .then((c) => console.log(`DB Connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
};

const getBase64 = (file: Express.Multer.File) =>
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

export const uploadToCloudinary = async (files: Express.Multer.File[]) => {
    const promises = files.map(async (file) => {
        return new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload(getBase64(file), (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result!);
            });
        });
    });

    const result = await Promise.all(promises);

    return result.map((i) => ({
        public_id: i.public_id,
        url: i.secure_url,
    }));
};


