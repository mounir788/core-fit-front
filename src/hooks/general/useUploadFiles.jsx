import { useState } from "react";
import { useNavigate } from "react-router";
import { showErrorToast } from "../../utils/toasts";
import { uploadFile } from "../../api/general/uploadFile";

export const useUploadFiles = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [totalMediaWillBeUploaded, setTotalMediaWillBeUploaded] = useState(0);
  const [currentMediaUpload, setCurrentMediaUpload] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const uploadImageToServer = async (
    id,
    image,
    link,
    folderName,
    imageName
  ) => {
    if (id) {
      try {
        setIsUploading(true);
        const uploadPromises = [];

        // Upload the main image if it exists
        if (Array.isArray(image)) {
          setTotalMediaWillBeUploaded(image.length);
          image.map((img, index) => {
            uploadPromises.push(
              uploadFile(img.image, img.name, folderName, setUploadProgress)
            );
            setCurrentMediaUpload(index + 1);
          });

          await Promise.all(uploadPromises);
        } else if (typeof image === "object") {
          // console.log(image);
          setTotalMediaWillBeUploaded(1);
          uploadPromises.push(
            uploadFile(image, imageName, folderName, setUploadProgress)
          );
          setCurrentMediaUpload(1);
          // Wait for all image upload promises to resolve
          await Promise.all(uploadPromises);
        }

        setIsUploading(false);

        if (!isUploading) {
          //   toast.success(successMessage);
          navigate(link); // Navigate after successful upload
        }
      } catch (err) {
        setIsUploading(false);
        console.error("Failed to upload images", err);
        showErrorToast("An error occurred while uploading the image"); // Display error notification
        throw new Error(err);
      }
    } else {
      setIsUploading(false);
      // toast.error("No ID provided");
    }
  };

  return {
    isUploading,
    uploadImageToServer,
    uploadProgress,
    currentMediaUpload,
    totalMediaWillBeUploaded,
  };
};
