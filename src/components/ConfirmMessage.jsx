/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { css } from "styled-components";
import {
  PopupButtonsContainer,
  PopupMessageContainer,
  PopupMessageText,
  PopupMessageTitle,
} from "../styles/generalStyles";
import MainButton from "./MainButton";

const ConfirmMessage = ({
  messagTitle = "Unsaved Changes Detected!",
  message = "You haven't saved your data yet. If you cancel now, all your progress will be lost. Do you still want to proceed?",
  acceptButtonLabel = "Discard Changes",
  cancelButtonLabel = "Continue Editing",
  action = () => {
    return;
  },
  isLoading,
  hasBlueAcceptButton = false,
  onCloseModal = () => {
    return;
  },
}) => {
  const cancelAction = () => {
    onCloseModal();
  };

  return (
    <PopupMessageContainer>
      <PopupMessageTitle>{messagTitle}</PopupMessageTitle>
      <PopupMessageText>{message}</PopupMessageText>
      <PopupButtonsContainer>
        <MainButton
          title={cancelButtonLabel}
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
          onClick={cancelAction}
        />
        {!hasBlueAcceptButton && (
          <MainButton
            title={acceptButtonLabel}
            // startIcon={<HiTrash />}
            colorfilled={"red"}
            variant="filled"
            onClick={(e) => {
              e.preventDefault();
              action(onCloseModal);
            }}
            isLoading={isLoading}
          />
        )}
        {hasBlueAcceptButton && (
          <MainButton
            title={acceptButtonLabel}
            // startIcon={<HiTrash />}
            // colorfilled={"red"}
            variant="filled"
            onClick={() => {
              action(onCloseModal);
            }}
            isLoading={isLoading}
          />
        )}
      </PopupButtonsContainer>
    </PopupMessageContainer>
  );
};

export default ConfirmMessage;
