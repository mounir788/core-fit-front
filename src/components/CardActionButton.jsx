import styled, { css } from "styled-components";
import { useHandleRefDisplay } from "../hooks/general/useHandleRefDisplay";
import UserActionsMenu from "./UserActionsMenu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router";

const EditMenu = styled.div`
  position: relative;
  direction: ltr !important;
  /* ${({ $top, $right }) =>
    css`
      position: absolute;
      top: ${$top};
      right: ${$right};
    `} */
`;
const EditMenuActionButton = styled.button`
  position: relative;
  display: grid;
  place-content: center;
  width: 100%;
  padding: 4px;
  border-radius: 8px;
  background: ${({ $background }) => $background};
  cursor: pointer;
  /* ${({ $type, $background, $color }) =>
    $type === "card" &&
    css`
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: ${$color};
    `} */
  /* ${({ $type }) =>
    ($type === "table" || $type === "user-card") &&
    css`
      color: var(--gray500);
    `} */
`;

const CardActionButton = ({
  link,
  deleteAction,
  isDeleting,
  windowToOpen,
  window,
  background = "transparent",
  color = "white",
  top = "25px",
  right = "25px",
  extraComponent,
}) => {
  const { isMenuDisplayed, menuRef, switchDisplayMenu, additionalRef } =
    useHandleRefDisplay();

  const navigate = useNavigate();

  const editAction = () => {
    navigate(link);
  };

  return (
    <EditMenu onClick={(e) => e.stopPropagation()} $top={top} $right={right}>
      <EditMenuActionButton
        ref={menuRef}
        onClick={(e) => {
          e.stopPropagation();
          switchDisplayMenu();
        }}
        $background={background}
        $color={color}
      >
        <HiOutlineDotsVertical size={16} />
      </EditMenuActionButton>
      {isMenuDisplayed && (
        <UserActionsMenu
          ref={additionalRef}
          deleteAction={deleteAction}
          editAction={link && editAction}
          isDeleting={isDeleting}
          windowToOpen={windowToOpen}
          window={window}
          extraComponent={extraComponent}
        />
      )}
    </EditMenu>
  );
};

export default CardActionButton;
