import { Link, useParams, useSearchParams } from "react-router";
import styled from "styled-components";
import {
  DateTime,
  Flex,
  Grid,
  OrderStatus,
} from "../../../../styles/generalStyles";
import { formatTime, getOnlyDate } from "../../../../utils/formatDate";
import { Skeleton } from "@mui/material";

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 12px;
  border-radius: 16px;
  background: white;
  box-shadow: 0px 2px 5px rgba(38, 38, 38, 0.07);

  & img {
    width: 20px;
  }

  &:hover {
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.09);
  }
`;

const ID = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 1.2;
  color: var(--mainColor);
`;

const Detailsbadge = styled.div`
  width: 80px;
  padding: 6px 8px;
  background: #cdeedc;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25;
  color: var(--mainColor);
  border-radius: 100px;
  text-align: center;
`;
const DetailsText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.48;
  color: var(--dark);
`;

const OrderCard = ({ data, isLoading }) => {
  const [searchParams] = useSearchParams();
  const { storeId } = useParams();
  const status = searchParams.get("status");

  return isLoading ? (
    <Card>
      <Flex $justify="space-between" $align="center">
        <ID>
          <Skeleton
            variant="text"
            sx={{ fontSize: "inherit" }}
            width={"100px"}
            animation="wave"
          />
        </ID>
        <Detailsbadge>Details</Detailsbadge>
      </Flex>
      <Flex $align="center" $gap={8}>
        <img src="/location.svg" alt="location" />
        <DetailsText>
          <Skeleton
            variant="text"
            sx={{ fontSize: "inherit" }}
            width={"100px"}
            animation="wave"
          />
        </DetailsText>
      </Flex>
      <Grid $cols="1fr 1fr" $gap={8}>
        <Flex $align="center" $gap={8}>
          <img src="/person.svg" alt="name" />
          <DetailsText>
            <Skeleton
              variant="text"
              sx={{ fontSize: "inherit" }}
              width={"100px"}
              animation="wave"
            />
          </DetailsText>
        </Flex>
        <Flex $align="center" $gap={8}>
          <img src="/iphone.svg" alt="phone" />
          <DetailsText>
            <Skeleton
              variant="text"
              sx={{ fontSize: "inherit" }}
              width={"100px"}
              animation="wave"
            />
          </DetailsText>
        </Flex>
      </Grid>
      <DateTime>
        <Skeleton
          variant="text"
          sx={{ fontSize: "inherit" }}
          width={"100px"}
          animation="wave"
        />
      </DateTime>
    </Card>
  ) : (
    <Card
      className={status}
      to={`/dashboard/stores/${storeId}/orders/${data.id}`}
    >
      <Flex $justify="space-between" $align="center">
        <ID>#{data?.id}</ID>
        <Detailsbadge>Details</Detailsbadge>
      </Flex>
      <Flex $align="center" $gap={8}>
        <img src="/location.svg" alt="location" />
        <DetailsText>{data.clientAddress}</DetailsText>
      </Flex>
      <Grid $cols="1fr 1fr" $gap={8}>
        <Flex $align="center" $gap={8}>
          <img src="/person.svg" alt="name" />
          <DetailsText>{data.clientName}</DetailsText>
        </Flex>
        <Flex $align="center" $gap={8}>
          <img src="/iphone.svg" alt="phone" />
          <DetailsText>{data.clientPhone}</DetailsText>
        </Flex>
      </Grid>
      {data.status === "ORDER_CANCELED" && (
        <OrderStatus className="canceld">Canceled</OrderStatus>
      )}
      {data.status === "ORDER_DELIVERED" && (
        <OrderStatus>Completed</OrderStatus>
      )}
      <DateTime>
        {getOnlyDate(data.createdAt)}. {formatTime(data.createdAt)}
      </DateTime>
    </Card>
  );
};

export default OrderCard;
