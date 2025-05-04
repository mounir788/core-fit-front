import styled, { css } from "styled-components";
import { Skeleton } from "@mui/material";
import { HiTrash } from "react-icons/hi";
import { PiEyeSlashLight, PiEyeLight } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";
import { Category, Flex } from "../../../styles/generalStyles";
import { useNavigate } from "react-router";
import useDelete from "../../../hooks/general/useDelete";
import useUpdateField from "../../../hooks/general/useUpdateField";
import Modal from "../../../components/Modal";
import DeleteMessage from "../../../components/DeleteMessage";
import ConfirmMessage from "../../../components/ConfirmMessage";
import MainButton from "../../../components/MainButton";
import RatingStars from "../../../components/RatingStars";
import Image from "../../../components/Image";

const Title = styled.h1`
  font-size: 40px;
  line-height: 1.2;
  font-weight: 600;
  color: var(--dark);
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.2;
  color: var(--gray600);
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

const StoreDetails = ({ data, isLoading, averageRate, rateCount }) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useDelete("/delete_market", [["markets"]]);
  const { mutate: closeStore, isPending: isHiding } = useUpdateField(
    `/change_status?id=${data?.id}`,
    [["markets"], ["single-market"]]
  );

  const deleteStore = (id, onCloseModal) => {
    mutate(id, {
      onSuccess: () => {
        onCloseModal?.();
        navigate(`/dashboard/stores`);
      },
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
    <Flex $direction="column" $gap={10}>
      <ImageContainer>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          animation="wave"
        />
      </ImageContainer>
      <Skeleton
        variant="text"
        sx={{ fontSize: "2rem" }}
        width={"80%"}
        animation="wave"
      />
      <Skeleton
        variant="text"
        sx={{ fontSize: "1rem" }}
        width={"20%"}
        animation="wave"
      />
      <Flex $direction="column">
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem" }}
          width={"70%"}
          animation="wave"
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem" }}
          width={"60%"}
          animation="wave"
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem" }}
          width={"50%"}
          animation="wave"
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem" }}
          width={"40%"}
          animation="wave"
        />
      </Flex>
      <Skeleton
        variant="text"
        sx={{ fontSize: "3rem" }}
        width={"20%"}
        animation="wave"
      />
      <Flex
        $gap={20}
        $customStyle={css`
          width: fit-content;
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid var(--gray300);
        `}
      >
        <Skeleton
          variant="rectangular"
          height={"40px"}
          width={"80px"}
          animation="wave"
          sx={{ borderRadius: "8px" }}
        />
        <Skeleton
          variant="rectangular"
          height={"40px"}
          width={"80px"}
          animation="wave"
          sx={{ borderRadius: "8px" }}
        />
        <Skeleton
          variant="rectangular"
          height={"40px"}
          width={"80px"}
          animation="wave"
          sx={{ borderRadius: "8px" }}
        />
      </Flex>
    </Flex>
  ) : (
    <Flex $direction="column" $gap={10}>
      <ImageContainer>
        <Image src={data?.imageUrl} alt={data?.name} />
      </ImageContainer>
      <Title>{data?.name}</Title>
      <Category>{data?.category?.name}</Category>
      <Description>{data?.description}</Description>
      <RatingStars ratingValue={averageRate} numberOfRatings={rateCount} />
      <Description>
        <strong>Address:</strong> {data?.address}
      </Description>
      <Flex
        $align="center"
        $gap={10}
        $customStyle={css`
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid var(--gray300);
        `}
      >
        <Modal>
          <Modal.Open opens={"deleteStore"}>
            <MainButton
              title={"Delete"}
              startIcon={<HiTrash />}
              colorfilled={"red"}
              variant="filled"
            />
          </Modal.Open>
          <MainButton
            title={"Edit"}
            startIcon={<TbEdit />}
            variant="filled"
            onClick={() => navigate(`/dashboard/stores/${data.id}/edit`)}
          />
          <Modal.Open opens="closeStore">
            <MainButton
              title={data.opened ? "Close" : "Open"}
              startIcon={data.opened ? <PiEyeLight /> : <PiEyeSlashLight />}
            />
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
          <Modal.Window name={"deleteStore"}>
            <DeleteMessage
              isLoading={isPending}
              deleteAction={(onCloseModal) =>
                deleteStore(data?.id, onCloseModal)
              }
            />
          </Modal.Window>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default StoreDetails;
