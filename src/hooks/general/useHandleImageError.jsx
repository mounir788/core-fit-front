import { useState } from "react";

export const useHandleImageError = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoading = () => {
    setIsImageLoading(false);
  };

  const addDefaultAvatar = (ev) => {
    ev.target.src = "/user-fallback-with-filled-background.svg";
  };

  const addDefaultBackground = (ev) => {
    ev.target.src = "/fallback-image.svg";
  };

  return {
    isImageLoading,
    handleImageLoading,
    addDefaultAvatar,
    addDefaultBackground,
  };
};
