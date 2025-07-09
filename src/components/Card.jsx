import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import { Skeleton } from "@mui/material";
import { PiEyeSlashLight, PiEyeLight } from "react-icons/pi";
import {
  EditButtonContainer,
  Flex,
  ShrinkedTextWithHover,
} from "../styles/generalStyles";
import CardActionButton from "./CardActionButton";
import Image from "./Image";
import useDelete from "../hooks/general/useDelete";
import useUpdateField from "../hooks/general/useUpdateField";
import Modal from "./Modal";
import ConfirmMessage from "./ConfirmMessage";

const StyledCard = styled.div`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.75rem;
  /* border: 1px solid #eee; */
  transition: background 0.2s ease-in-out;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
  background: white;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(38, 38, 38, 0.07);

  &.active,
  &:hover {
    background: var(--lightGreen);
    border-color: var(--lightGreen);
  }
`;

const Title = styled.h5`
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.1;
  color: var(--gray500);

  .active & {
    color: var(--mainColor);
  }
`;

const Subtitle = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.3;
  color: var(--gray500);

  position: relative;
`;

const ImageContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  & img {
    object-fit: contain;
  }
`;

const Card = ({ data, link, isLoading }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutate, isPending } = useDelete(
    pathname.includes("playgrounds") ? "/playground/delete" : "/delete_market",
    pathname.includes("playgrounds") ? [["playgrounds"]] : [["markets"]]
  );
  const { mutate: closeStore, isPending: isHiding } = useUpdateField(
    pathname.includes("playgrounds")
      ? `/playground/change_status?playgroundId=${data?.id}`
      : `/change_status?id=${data?.id}`,
    pathname.includes("playgrounds")
      ? [["playgrounds"], ["single-playground"]]
      : [["markets"], ["single-market"]]
  );

  const deleteStore = (id, onCloseModal) => {
    mutate(id, {
      onSuccess: () => onCloseModal?.(),
    });
  };

  const toggleOpenStore = (onCloseModal) => {
    closeStore(
      {},
      {
        onSuccess: () => onCloseModal?.(),
      }
    );
  };

  return isLoading ? (
    <StyledCard>
      <ImageContainer>
        <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
      </ImageContainer>
      <Flex $justify="space-between" $align="center" $width="100%" $gap={16}>
        <Flex $direction="column" $gap={4} style={{ flex: 1 }}>
          <Title>
            <Skeleton
              variant="text"
              sx={{ fontSize: "inherit" }}
              width={"40%"}
            />
          </Title>
          <Subtitle>
            <Skeleton variant="text" sx={{ fontSize: "inherit" }} />
          </Subtitle>
        </Flex>
        {/* <Skeleton
          variant="rectangular"
          width={"20px"}
          height={"30px"}
          sx={{ borderRadius: "8px" }}
        /> */}
      </Flex>
    </StyledCard>
  ) : (
    <StyledCard
      onClick={() => navigate(link)}
      className={pathname.includes(data.id) && "active"}
    >
      <ImageContainer>
        <Image src={data.imageUrl || data.images?.[0]} alt={data.name} />
      </ImageContainer>
      <Flex $justify="space-between" $align="center" $width="100%" $gap={16}>
        <Flex $direction="column" $gap={4} style={{ flex: 1 }}>
          <Title>{data.name}</Title>
          <Subtitle>
            <ShrinkedTextWithHover $hasHover={data.description?.length > 35}>
              <p>{data.description}</p>
              {data.description?.length > 35 && <div>{data.description}</div>}
            </ShrinkedTextWithHover>
          </Subtitle>
        </Flex>
        <CardActionButton
          link={
            pathname.includes("playgrounds")
              ? `/dashboard/playgrounds/${data.id}/edit`
              : `/dashboard/stores/${data.id}/edit`
          }
          deleteAction={(oncloseModal) => deleteStore(data.id, oncloseModal)}
          isDeleting={isPending}
          extraComponent={
            <Modal>
              <Modal.Open opens="closeStore">
                <EditButtonContainer>
                  {data.opened ? <PiEyeLight /> : <PiEyeSlashLight />}
                  {data.opened ? "Close" : "Open"}
                </EditButtonContainer>
              </Modal.Open>

              <Modal.Window name={"closeStore"}>
                <ConfirmMessage
                  messagTitle={data.opened ? "Close Store" : "Open Store"}
                  message={
                    data.opened
                      ? `Close (${data.name}) in stores`
                      : `Open (${data.name}) from stores`
                  }
                  acceptButtonLabel={data.opened ? "Close" : "Open"}
                  action={(onCloseModal) => toggleOpenStore(onCloseModal)}
                  isLoading={isHiding}
                  cancelButtonLabel={"Cancel"}
                />
              </Modal.Window>
            </Modal>
          }
        />
      </Flex>
    </StyledCard>
  );
};

export default Card;
