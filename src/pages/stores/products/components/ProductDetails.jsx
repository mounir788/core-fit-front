import styled, { css } from "styled-components";
import { Skeleton } from "@mui/material";
import { HiTrash } from "react-icons/hi";
import { PiEyeSlashLight, PiEyeLight } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";
import MainButton from "../../../../components/MainButton";
import {
  Category,
  Currency,
  Discount,
  Flex,
  Offer,
  Price,
} from "../../../../styles/generalStyles";
import { useNavigate, useParams } from "react-router";
import useDelete from "../../../../hooks/general/useDelete";
import useUpdateField from "../../../../hooks/general/useUpdateField";
import Modal from "../../../../components/Modal";
import DeleteMessage from "../../../../components/DeleteMessage";
import ConfirmMessage from "../../../../components/ConfirmMessage";

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

const ProductDetails = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { mutate, isPending } = useDelete("/products/delete_product", [
    ["products"],
  ]);
  const { mutate: hideProduct, isPending: isHiding } = useUpdateField(
    `/products/change_status?id=${data?.Product?.id}`,
    [["products"], ["single-product"]]
  );

  const deleteProduct = (id, onCloseModal) => {
    mutate(id, {
      onSuccess: () => {
        onCloseModal?.();
        navigate(`/dashboard/stores/${storeId}/products`);
      },
    });
  };

  const toggleHidProduct = (onCloseModal) => {
    hideProduct(
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
      <Title>{data?.Product?.name}</Title>
      <Category>{data?.subCategory?.name}</Category>
      <Description>{data?.Product?.description}</Description>
      <Flex $align="center" $gap={30}>
        <Price>
          {(
            data.Product?.price -
            (data.Product?.price * data.Product?.offer) / 100
          ).toFixed(2)}{" "}
          <Currency>L.E</Currency>
        </Price>
        {data.Product?.offer !== 0 && (
          <Flex $align={"center"} $gap={10}>
            <Offer>{data.Product?.price} L.E</Offer>
            <Discount>
              {data?.Product?.offer}% <span>Discount</span>
            </Discount>
          </Flex>
        )}
      </Flex>
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
          <Modal.Open opens={"deleteProduct"}>
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
            onClick={() =>
              navigate(
                `/dashboard/stores/${storeId}/products/${data.Product?.id}/edit`
              )
            }
          />
          <Modal.Open opens="hideProduct">
            <MainButton
              title={data.Product?.hidden ? "Show" : "Hide"}
              startIcon={
                data.Product?.hidden ? <PiEyeLight /> : <PiEyeSlashLight />
              }
            />
          </Modal.Open>

          <Modal.Window name={"hideProduct"}>
            <ConfirmMessage
              messagTitle={
                data.Product?.hidden ? "Show Product" : "Hide Product"
              }
              message={
                data.Product?.hidden
                  ? `Show (${data.Product?.name}) in products`
                  : `Hide (${data.Product?.name}) from products`
              }
              acceptButtonLabel={data.Product?.hidden ? "Show" : "Hide"}
              action={(onCloseModal) => toggleHidProduct(onCloseModal)}
              isLoading={isHiding}
              cancelButtonLabel={"Cancel"}
            />
          </Modal.Window>
          <Modal.Window name={"deleteProduct"}>
            <DeleteMessage
              isLoading={isPending}
              deleteAction={(onCloseModal) =>
                deleteProduct(data?.Product?.id, onCloseModal)
              }
            />
          </Modal.Window>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default ProductDetails;
