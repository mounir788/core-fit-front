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
export const deleteFile = async (fileName, folderName) => {
  const params = {
    Bucket: bucketName,
    Key: folderName ? `${folderName}/${fileName}` : `${fileName}`,
  };
  try {
    const result = await s3Client.send(new DeleteObjectCommand(params));
    console.log(`File deleted successfully. ${result.Location}`);
    return result;
    //
  } catch (err) {
    console.error("Error", err);
    throw new Error(err);
  }
};
