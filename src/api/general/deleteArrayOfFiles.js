import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const bucketName = import.meta.env.VITE_BUCKET_NAME;
const endpointUrl = "https://fra1.digitaloceanspaces.com";
const regionName = "fra1";
const accessKeyId = import.meta.env.VITE_S3_ACCESS_KEY;
const secretAccessKey = import.meta.env.VITE_S3_SECRET_ACCESS_KEY;

export const s3Client = new S3Client({
  region: regionName,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  endpoint: endpointUrl,
});

// Function to delete a single file
const deleteSingleFile = async (fileName, folderName) => {
  const params = {
    Bucket: bucketName,
    Key: folderName ? `${folderName}/${fileName}` : fileName,
  };
  return s3Client.send(new DeleteObjectCommand(params));
};

// Function to delete an array of files
export const deleteListOfFiles = async (filesArray) => {
  try {
    const deletePromises = filesArray.map(({ fileName, folderName }) =>
      deleteSingleFile(fileName, folderName)
    );
    const results = await Promise.all(deletePromises);
    console.log("All files deleted successfully.", results);
    return results;
  } catch (err) {
    console.error("Error deleting files", err);
    throw new Error(err);
  }
};
