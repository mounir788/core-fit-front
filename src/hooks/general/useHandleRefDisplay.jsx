import { useState } from "react";
import useHandleClickOutside from "./useHandleClickOutside";

export const useHandleRefDisplay = (isClickOutsideDisabled = false) => {
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);

  const { targetRef: menuRef, additionalRef } = useHandleClickOutside(
    setIsMenuDisplayed,
    isClickOutsideDisabled
  );

  const switchDisplayMenu = () => {
    setIsMenuDisplayed(!isMenuDisplayed);
  };

  const openDisplayMenu = () => {
    setIsMenuDisplayed(true);
  };

  const closeDisplayMenu = () => {
    setIsMenuDisplayed(false);
  };

  return {
    isMenuDisplayed,
    switchDisplayMenu,
    openDisplayMenu,
    closeDisplayMenu,

    menuRef,
    additionalRef,
  };
};
