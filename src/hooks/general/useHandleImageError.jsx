// import { useState } from "react";

import { useState } from "react";

export const useHandleImageError = () => {
  //   const [isImageError, setIsImageError] = useState(false);

  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoading = () => {
    setIsImageLoading(false);
  };

  const addDefaultAvatar = (ev) => {
    ev.target.src = "/user-fallback-with-filled-background.svg";
  };

  const addDefaultBackground = (ev) => {
    // ev.target.src = "/fallback-image.webp";
    ev.target.src = "/fallback-image.svg";
    // ev.target.src = "/public/not-found-image.webp";
  };

  return {
    // isImageError,
    // handleImageError,
    isImageLoading,
    handleImageLoading,
    addDefaultAvatar,
    addDefaultBackground,
  };
};
