import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Configure the S3 client for DigitalOcean Spaces
const s3Client = new S3Client({
  endpoint: "https://fra1.digitaloceanspaces.com", // Replace with your region
  region: "fra1", // Replace with your region
  credentials: {
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
  },
});

// Function to list images in the 'team' folder
export const listTeamImages = async (bucketName, folderName) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: `${folderName}/`, // Filter objects in the folder
    });

    const response = await s3Client.send(command);

    if (response.Contents) {
      // Filter to get image files
      const images = response.Contents.filter((item) =>
        item.Key.match(/\.(jpg|jpeg|png|gif|webp)$/i)
      );

      console.log(
        `Number of images in the "${folderName}" folder: ${images.length}`
      );
      console.log(
        "Image files:",
        images.map((img) => img.Key)
      );
    } else {
      console.log(`No objects found in the "${folderName}" folder.`);
    }
  } catch (error) {
    console.error("Error listing images:", error);
  }
};
