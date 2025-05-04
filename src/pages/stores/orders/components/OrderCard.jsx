import { Link, useSearchParams } from "react-router";
import styled from "styled-components";
import { Flex, Grid } from "../../../../styles/generalStyles";
import { getOnlyDate } from "../../../../utils/formatDate";
import { Skeleton } from "@mui/material";

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 12px;
  border-radius: 16px;
  background: var(--gray20);
  transition: 300ms ease-in-out;

  & img {
    width: 20px;
  }

  &:hover {
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.09);
  }

  &.completed {
    background: var(--gray10);
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
const DateTime = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25;

  color: #666b88;
`;

const Done = styled.div`
  width: fit-content;
  padding: 8px 16px;
  border-radius: 100px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
  background: #777777;
  color: white;
`;

const OrderCard = ({ data, isLoading }) => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  return isLoading ? (
    <Card>
      <Flex $justify="space-between" $align="center">
        <ID>
          <Skeleton
            variant="text"
            sx={{ fontSize: "inherit" }}
            width={"100px"}
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
            />
          </DetailsText>
        </Flex>
      </Grid>
      <DateTime>
        <Skeleton variant="text" sx={{ fontSize: "inherit" }} width={"100px"} />
      </DateTime>
    </Card>
  ) : (
    <Card className={status}>
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
          <DetailsText>{data.clientName || "Mounir Ahmed"}</DetailsText>
        </Flex>
        <Flex $align="center" $gap={8}>
          <img src="/iphone.svg" alt="phone" />
          <DetailsText>{data.clientName || "+20118477375"}</DetailsText>
        </Flex>
      </Grid>
      {status === "completed" && <Done>Completed Order</Done>}
      <DateTime>{getOnlyDate(data.createdAt)}</DateTime>
    </Card>
  );
};

export default OrderCard;
