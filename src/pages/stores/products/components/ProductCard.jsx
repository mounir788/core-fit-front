import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { PiEyeSlashLight, PiEyeLight } from "react-icons/pi";
import {
  Category,
  Currency,
  EditButtonContainer,
  Flex,
  Offer,
  Price,
} from "../../../../styles/generalStyles";
import CardActionButton from "../../../../components/CardActionButton";
import useDelete from "../../../../hooks/general/useDelete";
import Modal from "../../../../components/Modal";
import ConfirmMessage from "../../../../components/ConfirmMessage";
import useUpdateField from "../../../../hooks/general/useUpdateField";
import Image from "../../../../components/Image";
import { Skeleton } from "@mui/material";

const Card = styled.div`
  position: relative;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid var(--gray10);
  cursor: pointer;
  /* height: 290px; */
  background: white;
  transition: 400ms ease-in-out;

  &:hover {
    box-shadow: 0px 5px 12px 0px #4a494b33, -2px 22px 22px 0px #4a494b2b,
      -3px 49px 30px 0px #4a494b1a, -6px 88px 35px 0px #4a494b08,
      -10px 137px 39px 0px #4a494b00;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 165px;
  background: var(--gray100);
  border-radius: inherit;
  overflow: hidden;

  & img {
    object-fit: contain;
  }
`;

const Box = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
  height: 115px;
`;

const Name = styled.h5`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  text-align: start;
  color: var(--drak);
`;

const ActionButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;

const Hidden = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px;
  border-radius: 8px;
  background: white;
  display: grid;
  place-content: center;
  z-index: 4;
`;

const Count = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: grid;
  place-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--mainColor);
  color: white;
  z-index: 4;
`;

const ProductCard = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const { storeId, orderId } = useParams();
  const { mutate, isPending } = useDelete("/products/delete_product", [
    ["products"],
  ]);
  const { mutate: hideProduct, isPending: isHiding } = useUpdateField(
    `/products/change_status?id=${data?.id}`,
    [["products"], ["single-product"]]
  );

  const deleteProduct = (id, onCloseModal) => {
    mutate(id, { onSuccess: () => onCloseModal?.() });
  };

  const toggleHidProduct = (onCloseModal) => {
    hideProduct({}, { onSuccess: () => onCloseModal?.() });
  };

  return isLoading ? (
    <Card>
      <ImageContainer>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          animation="wave"
        />
      </ImageContainer>
      <Box>
        <Flex $direction="column">
          <Skeleton
            variant="text"
            sx={{ fontSize: "1.5rem" }}
            animation="wave"
          />
          <Skeleton
            variant="text"
            width={"80%"}
            sx={{ fontSize: "1.5rem" }}
            animation="wave"
          />
        </Flex>
        <Flex $direction="column" $gap={8}>
          <Category>
            <Skeleton
              variant="text"
              sx={{ fontSize: "inherit" }}
              width={"50%"}
              animation="wave"
            />
          </Category>
          <Price>
            <Skeleton
              variant="text"
              sx={{ fontSize: "inherit" }}
              animation="wave"
            />
          </Price>
        </Flex>
      </Box>
    </Card>
  ) : (
    <Card
      onClick={() =>
        navigate(`/dashboard/stores/${storeId}/products/${data.id}`)
      }
    >
      {data.hidden && (
        <Hidden>
          <PiEyeSlashLight size={18} />
        </Hidden>
      )}
      {orderId && (
        <Count>
          <span>
            <strong>{data.count}</strong>x
          </span>
        </Count>
      )}
      {!orderId && (
        <ActionButton>
          <CardActionButton
            background="white"
            extraComponent={
              <Modal>
                <Modal.Open opens="hideProduct">
                  <EditButtonContainer>
                    {data.hidden ? <PiEyeLight /> : <PiEyeSlashLight />}
                    {data.hidden ? "Show" : "Hide"}
                  </EditButtonContainer>
                </Modal.Open>

                <Modal.Window name={"hideProduct"}>
                  <ConfirmMessage
                    messagTitle={data.hidden ? "Show Product" : "Hide Product"}
                    message={
                      data.hidden
                        ? `Show (${data.name}) in products`
                        : `Hide (${data.name}) from products`
                    }
                    acceptButtonLabel={data.hidden ? "Show" : "Hide"}
                    action={(onCloseModal) => toggleHidProduct(onCloseModal)}
                    isLoading={isHiding}
                    cancelButtonLabel={"Cancel"}
                  />
                </Modal.Window>
              </Modal>
            }
            isDeleting={isPending}
            deleteAction={(onCloseModal) =>
              deleteProduct(data.id, onCloseModal)
            }
            link={`/dashboard/stores/${storeId}/products/${data.id}/edit`}
          />
        </ActionButton>
      )}
      <ImageContainer>
        <Image src={data.images?.[0] || ""} alt={data.name} />
      </ImageContainer>
      <Box>
        <Name>{data.name}</Name>
        <Flex $direction="column" $gap={8}>
          <Category>{data.subCategoryName}</Category>
          <Flex $align="center" $gap={8}>
            <Price>
              {(data.price - (data.price * data.offer) / 100).toFixed(2)}{" "}
              <Currency>L.E</Currency>
            </Price>

            {data.offer !== 0 && <Offer>{data.price} L.E</Offer>}
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};

export default ProductCard;
