// const bucketName = import.meta.env.VITE_BUCKET_NAME;
// const endpointUrl = "https://fra1.digitaloceanspaces.com";
// const regionName = "fra1";

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { XhrHttpHandler } from "@aws-sdk/xhr-http-handler";
import { supabase } from "../../supabase";

// const handler = new XhrHttpHandler({});

// export const s3Client = new S3Client({
//   region: regionName,
//   credentials: {
//     accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
//     secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
//   },
//   endpoint: endpointUrl,
//   requestHandler: handler,
// });

export const uploadFile = async (file, fileName, folderName) => {
  const filePath = folderName ? `${folderName}/${fileName}` : fileName;

  try {
    const { error } = await supabase.storage
      .from(import.meta.env.VITE_SUPABASE_BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(import.meta.env.VITE_SUPABASE_BUCKET_NAME)
      .getPublicUrl(filePath);

    console.log("File uploaded successfully:");

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Upload failed:", err.message);
    throw err;
  }
};
