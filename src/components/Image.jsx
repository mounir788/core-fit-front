import { useState } from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { useHandleImageError } from "../hooks/general/useHandleImageError";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  border-radius: inherit;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${({ $isLoaded }) => ($isLoaded ? "block" : "none")};
`;

const Image = ({ src, alt, isHuman = false, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { handleImageLoading, addDefaultAvatar, addDefaultBackground } =
    useHandleImageError();

  const handleLoad = (e) => {
    handleImageLoading(e);
    setIsLoaded(true);
  };

  return (
    <Wrapper className={className}>
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          animation="wave"
          sx={{ borderRadius: "inherit" }}
        />
      )}
      <StyledImage
        src={src}
        alt={alt}
        $isLoaded={isLoaded}
        onError={isHuman ? addDefaultAvatar : addDefaultBackground}
        onLoad={handleLoad}
      />
    </Wrapper>
  );
};

export default Image;
