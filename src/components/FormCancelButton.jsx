/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import { css } from "styled-components";
import Modal from "./Modal";
import MainButton from "./MainButton";
import ConfirmMessage from "./ConfirmMessage";

const FormCancelButton = ({ buttonLabel = "Cancel", action }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (!action) {
      navigate(-1);
    } else {
      action();
    }
  };

  return (
    <Modal>
      <Modal.Open opens={"confirm"}>
        <MainButton
          title={buttonLabel}
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
          onClick={(e) => e.preventDefault()}
        />
      </Modal.Open>

      <Modal.Window name={"confirm"}>
        <ConfirmMessage action={goBack} />
      </Modal.Window>
    </Modal>
  );
};

export default FormCancelButton;
