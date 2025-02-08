import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { XhrHttpHandler } from "@aws-sdk/xhr-http-handler";

const bucketName = import.meta.env.VITE_BUCKET_NAME;
const endpointUrl = "https://fra1.digitaloceanspaces.com";
const regionName = "fra1";

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

// this function upload all files at the same time

// export const uploadFiles = async (
//   files,
//   filesNamesArray,
//   folderName,
//   onProgress
// ) => {
//   const uploadPromises = files.map((file, index) => {
//     const fileName = filesNamesArray[index];
//     const params = {
//       Bucket: bucketName,
//       Key: folderName ? `${folderName}/${fileName}` : `${fileName}`,
//       Body: file,
//       ACL: "public-read",
//     };

//     // Return a new Promise without making the executor async
//     return new Promise((resolve, reject) => {
//       const uploadCommand = new PutObjectCommand(params);

//       handler.on(XhrHttpHandler.EVENTS.UPLOAD_PROGRESS, (xhr) => {
//         const progress = Math.round((xhr.loaded / xhr.total) * 100);
//         if (onProgress) {
//           onProgress(index, progress); // Track progress for each file
//           // onProgress(progress); // Track progress for each file
//         }
//       });

//       s3Client
//         .send(uploadCommand)
//         .then((data) => resolve(data))
//         .catch((err) => {
//           console.error("Error uploading file:", fileName, err);
//           reject(err);
//         });
//     });
//   });

//   try {
//     const data = await Promise.all(uploadPromises);
//     console.log("Files uploaded successfully:", { successFiles: data });
//     return data;
//   } catch (err) {
//     console.error("Error uploading files:", err);
//     throw new Error(err);
//   }
// };

// this function upload files one after one

export const uploadFiles = async (
  files,
  filesNamesArray,
  folderName,
  onProgress
) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = filesNamesArray[i];
    const params = {
      Bucket: bucketName,
      Key: folderName ? `${folderName}/${fileName}` : `${fileName}`,
      Body: file,
      ACL: "public-read",
    };

    try {
      await new Promise((resolve, reject) => {
        const uploadCommand = new PutObjectCommand(params);

        handler.on(XhrHttpHandler.EVENTS.UPLOAD_PROGRESS, (xhr) => {
          const progress = Math.round((xhr.loaded / xhr.total) * 100);
          if (onProgress) {
            onProgress(i, progress); // Track progress for each file
          }
        });

        s3Client
          .send(uploadCommand)
          .then((data) => {
            console.log(`File ${i + 1} uploaded successfully:`, data);
            resolve(data);
          })
          .catch((err) => {
            console.error("Error uploading file:", fileName, err);
            reject(err);
          });
      });
    } catch (err) {
      console.error(`Error uploading file ${fileName}:`, err);
      throw new Error(err);
    }
  }

  console.log("All files uploaded successfully");
};
