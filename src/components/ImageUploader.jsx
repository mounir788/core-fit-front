import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ReactSortable } from "react-sortablejs"; // ✅ Correct component to render
import styled from "styled-components";
import { LuUpload } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  /* flex-wrap: wrap; */
  grid-column: 1 / -1;
`;

const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 120px;
  border: 2px dashed var(--gray400);

  color: var(--gray500);
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  background-color: ${({ $active }) =>
    $active ? "var(--gray200)" : "transparent"};
  transition: background-color 0.3s ease;
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  border: 1px solid #e2e2e2;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: white;
  cursor: move;
  /* transition: transform 150ms ease, box-shadow 150ms ease;

  &.sortable-ghost {
    opacity: 0.5;
  }

  &.sortable-chosen {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
    z-index: 10;
  } */
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;

  cursor: pointer;

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

const ImageUploader = ({ defaultImages = [], onChange, folderName }) => {
  const [images, setImages] = useState(
    defaultImages.map((url, index) => ({ id: `${index}`, url }))
  );

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => {
        const extension = file.name.split(".").pop();
        const uniqueName = `${uuidv4()}.${extension}`;

        return {
          id: uuidv4(),
          file,
          url: URL.createObjectURL(file),
          name: uniqueName, // <--- Use this for uploading later
          supabaseUrl: `${
            import.meta.env.VITE_SUPABASE_URL
          }/storage/v1/object/public/${
            import.meta.env.VITE_SUPABASE_BUCKET_NAME
          }/${folderName}/${uniqueName}`,
        };
      });

      setImages((prev) => {
        const updated = [...prev, ...newImages];
        onChange?.(updated);
        return updated;
      });
    },
    [onChange]
  );

  const removeImage = (id) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      onChange?.(updated);
      return updated;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <Container>
      <DropZone {...getRootProps()} $active={isDragActive}>
        <input {...getInputProps()} />

        <LuUpload size={40} />
        {isDragActive ? (
          <p>Drop the images here ...</p>
        ) : (
          <p>Drag & drop images here, or click to select</p>
        )}
      </DropZone>

      <ReactSortable
        list={images}
        setList={(newList) => {
          setImages(newList);
          onChange?.(newList);
        }}
        tag={ImagesWrapper}
        animation={200}
        swapThreshold={0.5}
      >
        {images.map(({ id, url }, index) => (
          <ImageContainer key={id}>
            <StyledImage src={url} alt={`img-${index}`} />
            <DeleteButton onClick={() => removeImage(id)}>×</DeleteButton>
          </ImageContainer>
        ))}
      </ReactSortable>
    </Container>
  );
};

export default ImageUploader;
