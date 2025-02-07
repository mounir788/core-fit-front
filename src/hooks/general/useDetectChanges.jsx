// import { BsPatchExclamation } from "react-icons/bs";
import { showInfoToast } from "../../utils/toasts";

export const useDetectChanges = (disableDeleteImage = false) => {
  const compareAndUpdateImage = (defaultFile, newFile, updatedFields) => {
    if (!defaultFile || !newFile) return updatedFields;

    // Compare file name, size, and type
    if (
      defaultFile.name !== newFile.name ||
      defaultFile.size !== newFile.size ||
      defaultFile.type !== newFile.type
    ) {
      updatedFields.image = newFile; // Add newFile to updatedFields if different
    } else {
      return updatedFields;
    }
  };

  const detectChanges = (formData, item, image) => {
    const updatedFields = {};

    // Compare formData with the initial values in item
    for (const key in formData) {
      // Check if the value is an object
      if (typeof formData[key] === "object" || Array.isArray(formData[key])) {
        // Compare object properties by converting them to JSON strings
        const isEqual =
          JSON.stringify(formData[key]) === JSON.stringify(item[key]);
        if (!isEqual) {
          updatedFields[key] = formData[key];
        }
      } else if (formData[key] !== item[key]) {
        updatedFields[key] = formData[key];
      }
    }

    // // Delete empty string data
    // for (const key in updatedFields) {
    //   if (updatedFields[key] === "") {
    //     delete updatedFields[key];
    //   }
    // }

    // Delete NaN data
    for (const key in updatedFields) {
      if (
        Number.isNaN(updatedFields[key]) &&
        (Number.isNaN(item[key]) ||
          item[key] === null ||
          item[key] === undefined)
      ) {
        delete updatedFields[key];
      }
    }

    compareAndUpdateImage(item?.image?.[0], formData?.image, updatedFields);

    if (!updatedFields.image) {
      delete updatedFields.image;
    }

    // If no changes are detected and the image is not an object, show toast
    if (
      Object.keys(updatedFields).length === 0
      // || (Object.keys(updatedFields).length === 0 && typeof image !== "object")
    ) {
      showInfoToast("No changes detected!");
      return null; // Return null if no changes are detected
    }

    // Remove image from changed fields if it exists
    if (!disableDeleteImage && updatedFields.image) {
      delete updatedFields.image;
    }

    return updatedFields; // Return the changed fields
  };

  return {
    detectChanges,
  };
};
