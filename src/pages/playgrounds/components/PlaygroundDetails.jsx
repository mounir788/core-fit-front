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

const PlaygroundDetails = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useDelete("/playgrounds/delete_playground", [
    ["playgrounds"],
  ]);
  const { mutate: closePlayground, isPending: isHiding } = useUpdateField(
    `/playgrounds/change_status?id=${data?.id}`,
    [["playgrounds"], ["single-playground"]]
  );

  const deletePlayground = (id, onCloseModal) => {
    mutate(id, {
      onSuccess: () => {
        onCloseModal?.();
        navigate(`/dashboard/playgrounds`);
      },
    });
  };

  const toggleHidPlayground = (onCloseModal) => {
    closePlayground(
      {},
      {
        onSuccess: () => onCloseModal?.(),
      }
    );
  };

  return isLoading ? (
    <Flex $direction="column" $gap={10}>
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
      <Title>{data?.name}</Title>
      <Category>{data?.subCategory?.name}</Category>
      <Description>{data?.description}</Description>
      <RatingStars
        ratingValue={data?.avgRate}
        numberOfRatings={data?.rateCount || 0}
      />

      {/* <Flex $align="center" $gap={30}>
        <Price>
          {(data.price - (data.price * data.offer) / 100).toFixed(2)}{" "}
          <Currency>L.E</Currency>
        </Price>
        {data.offer !== 0 && (
          <Flex $align={"center"} $gap={10}>
            <Offer>{data.price} L.E</Offer>
            <Discount>
              {data?.offer}% <span>Discount</span>
            </Discount>
          </Flex>
        )}
      </Flex> */}
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
          <Modal.Open opens={"deletePlayground"}>
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
            onClick={() => navigate(`/dashboard/playgrounds/${data.id}/edit`)}
          />
          <Modal.Open opens="closePlayground">
            <MainButton
              title={!data.opened ? "Open" : "Close"}
              startIcon={!data.opened ? <PiEyeLight /> : <PiEyeSlashLight />}
            />
          </Modal.Open>

          <Modal.Window name={"closePlayground"}>
            <ConfirmMessage
              messagTitle={
                !data.opened ? "Open Playground" : "Close Playground"
              }
              message={
                !data.opened
                  ? `Open (${data.name}) in playgrounds`
                  : `Close (${data.name}) from playgrounds`
              }
              acceptButtonLabel={!data.opened ? "Open" : "Close"}
              action={(onCloseModal) => toggleHidPlayground(onCloseModal)}
              isLoading={isHiding}
              cancelButtonLabel={"Cancel"}
            />
          </Modal.Window>
          <Modal.Window name={"deletePlayground"}>
            <DeleteMessage
              isLoading={isPending}
              deleteAction={(onCloseModal) =>
                deletePlayground(data?.id, onCloseModal)
              }
            />
          </Modal.Window>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default PlaygroundDetails;
