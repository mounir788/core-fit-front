/* eslint-disable react/display-name */

/* eslint-disable react/prop-types */
import {
  ActionMenuContainer,
  DeleteButtonContainer,
  EditButtonContainer,
  Flex,
} from "../styles/generalStyles";
import { HiTrash } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";

import { forwardRef } from "react";
import Modal from "./Modal";
import DeleteMessage from "./DeleteMessage";
import { useSearchParams } from "react-router";

const UserActionsMenu = forwardRef(
  (
    {
      editAction = () => {
        return;
      },
      deleteAction = () => {
        return;
      },
      isDeleting,
      windowToOpen,
      top,
      left,
      position = "absolute",
      window = <div></div>,
      extraComponent = <></>,
    },
    ref
  ) => {
    const [searchParams] = useSearchParams();
    const lang = searchParams.get("lang");

    return (
      <>
        <ActionMenuContainer
          ref={ref}
          $ar={lang === "ar"}
          $position={position}
          $top={top}
          $left={left}
        >
          <Flex $width={"100%"} $direction={"column"} $gap={8}>
            {extraComponent}

            {!windowToOpen && editAction && (
              <EditButtonContainer
                onClick={(e) => {
                  e.stopPropagation();

                  editAction();
                }}
              >
                <TbEdit />
                Edit
              </EditButtonContainer>
            )}

            {windowToOpen && (
              <Modal>
                <Modal.Open opens={windowToOpen}>
                  <EditButtonContainer onClick={(e) => e.stopPropagation()}>
                    <TbEdit />
                    Edit
                  </EditButtonContainer>
                </Modal.Open>
                <Modal.Window name={windowToOpen}>{window}</Modal.Window>
              </Modal>
            )}

            {deleteAction && (
              <Modal>
                <Modal.Open opens={"delete"}>
                  <DeleteButtonContainer>
                    <HiTrash /> Delete
                  </DeleteButtonContainer>
                </Modal.Open>

                <Modal.Window name={"delete"}>
                  <DeleteMessage
                    isLoading={isDeleting}
                    deleteAction={deleteAction}
                  />
                </Modal.Window>
              </Modal>
            )}
          </Flex>
        </ActionMenuContainer>
      </>
    );
  }
);

export default UserActionsMenu;
