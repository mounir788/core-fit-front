import { useState } from "react";
import styled from "styled-components";
import { Error } from "../styles/generalStyles";
import { LuUpload } from "react-icons/lu";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  grid-column: 1 / -1;
`;

const ImageLabel = styled.label`
  width: 128px;
  height: 128px;
  border-radius: ${({ $radius }) => $radius || "50%"};
  border: 2px dashed #ccc;
  background-color: #f9f9f9;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Placeholder = styled.span`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #aaa;
  font-size: 0.9rem;
`;

const ProfileImageInput = ({ name, error, setValue, defaultImage, radius }) => {
  const [preview, setPreview] = useState(defaultImage || null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Container>
      <ImageLabel htmlFor={name} $radius={radius}>
        {preview && <PreviewImage src={preview} alt="Profile Preview" />}

        <Placeholder>
          <LuUpload />
          Upload
        </Placeholder>
      </ImageLabel>
      <HiddenInput
        id={name}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default ProfileImageInput;
