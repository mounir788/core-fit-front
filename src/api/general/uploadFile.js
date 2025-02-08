const bucketName = import.meta.env.VITE_BUCKET_NAME;
const endpointUrl = "https://fra1.digitaloceanspaces.com";
const regionName = "fra1";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { XhrHttpHandler } from "@aws-sdk/xhr-http-handler";

const handler = new XhrHttpHandler({});

export const s3Client = new S3Client({
  region: regionName,
  credentials: {
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
  },
  endpoint: endpointUrl,
  requestHandler: handler,
});

export const uploadFile = async (file, fileName, folderName, onProgress) => {
  const params = {
    Bucket: bucketName,
    Key: folderName ? `${folderName}/${fileName}` : `${fileName}`,
    Body: file,
    ACL: "public-read",
  };

  try {
    const uploadCommand = new PutObjectCommand(params);

    handler.on(XhrHttpHandler.EVENTS.UPLOAD_PROGRESS, (xhr) => {
      const progress = Math.round((xhr.loaded / xhr.total) * 100);
      onProgress(progress); // Call the progress callback
    });

    const data = await s3Client.send(uploadCommand);
    console.log("file uploaded successfully : ", { successFile: data });
  } catch (err) {
    console.error("Error", err);
    throw new Error(err);
  }
};
