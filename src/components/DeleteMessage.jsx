/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { css } from "styled-components";
import MainButton from "./MainButton";
import { HiTrash } from "react-icons/hi";
import {
  PopupButtonsContainer,
  PopupMessageContainer,
  PopupMessageText,
  PopupMessageTitle,
} from "../styles/generalStyles";

const DeleteMessage = ({
  deleteAction = () => {
    return;
  },
  isLoading,
  message = " Are you sure you want to delete this? This action cannot be undone and will permanently remove all associated data.",
  title = "Confirm Deletion",
  deleteButtonTitle = "Delete",
  startIcon = <HiTrash />,
  onCloseModal = () => {
    return;
  },
}) => {
  const cancelDelete = (e) => {
    e.stopPropagation();

    onCloseModal();
  };

  return (
    <PopupMessageContainer>
      <PopupMessageTitle>{title}</PopupMessageTitle>
      <PopupMessageText>{message}</PopupMessageText>
      <PopupButtonsContainer>
        <MainButton
          title={"Cancel"}
          customStyle={css`
            border: none !important;
            background: transparent !important;
            color: var(--gray700) !important;

            &:hover {
              background: var(--gray200) !important;
              color: var(--mainColor) !important;
            }
          `}
          endIcon={<div className="px-1" />}
          startIcon={<div className="px-1" />}
          onClick={(e) => cancelDelete(e)}
        />
        <MainButton
          title={deleteButtonTitle}
          startIcon={startIcon}
          colorfilled={"red"}
          variant="filled"
          onClick={() => {
            deleteAction(onCloseModal);
            // onCloseModal?.();
          }}
          isLoading={isLoading}
        />
      </PopupButtonsContainer>
    </PopupMessageContainer>
  );
};

export default DeleteMessage;
