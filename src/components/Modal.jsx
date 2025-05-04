import { cloneElement, createContext, useContext, useState } from "react";
// import { createPortal } from "react-dom";
// import { useOutsideClick } from "../hooks/useOutsideClick";
import { StyledModal } from "../styles/generalStyles";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: (e) => {
      e?.stopPropagation();
      open(opensWindowName);
    },
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return (
    <StyledModal onClick={(e) => e.stopPropagation()}>
      <div
        // ref={ref}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        // onClick={close}
      >
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </StyledModal>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
