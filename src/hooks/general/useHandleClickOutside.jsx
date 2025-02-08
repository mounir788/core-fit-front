import { useEffect, useRef } from "react";

const useHandleClickOutside = (setShowMenu, isDisabled = false) => {
  const targetRef = useRef(null);
  const additionalRef = useRef(null);

  // Toggle the open state when the selection input is clicked

  // Close the selection input when clicking outside of it
  useEffect(() => {
    if (!isDisabled) {
      const handleClickOutside = (event) => {
        if (
          targetRef.current &&
          !targetRef.current.contains(event.target) &&
          (!additionalRef.current ||
            !additionalRef.current.contains(event.target))
        ) {
          setShowMenu(false);
        }
      };

      // Add event listener when the component mounts
      document.addEventListener("mousedown", handleClickOutside);

      // Remove event listener when the component unmounts
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [targetRef, additionalRef]);

  return { targetRef, additionalRef };
};

export default useHandleClickOutside;
