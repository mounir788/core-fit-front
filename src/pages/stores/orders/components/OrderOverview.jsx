import styled, { css } from "styled-components";
import {
  DateTime,
  Flex,
  Grid,
  IndicatorBoxContainer,
  OrderStatus,
} from "../../../../styles/generalStyles";
import ProductCard from "../../products/components/ProductCard";
import MainButton from "../../../../components/MainButton";
import { formatTime, getOnlyDate } from "../../../../utils/formatDate";

const Name = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25;
  color: #666b88;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  color: var(--dark);
`;

const OrderOverview = ({ data }) => {
  return (
    <Flex $direction="column" $gap={16}>
      <Grid $cols="repeat(auto-fill, minmax(167px,1fr))" $gap={"8px"}>
        {data.orderItems.map((item) => (
          <ProductCard data={item} key={item} />
        ))}
      </Grid>
      <Grid
        $cols="1fr 0.5fr"
        $gap={"8px"}
        $customeStyle={css`
          @media (width <= 992px) {
            grid-template-columns: 1fr;
          }
        `}
      >
        <IndicatorBoxContainer
          $background="#EEFBF4"
          $customeStyle={css`
            align-items: flex-start;
            justify-content: flex-start;
            height: auto;
            &:hover {
              background: #eefbf4;
            }
            & img {
              width: 20px;
              height: 20px;
              object-fit: contain;
            }
          `}
        >
          <Flex
            $gap={12}
            $align="center"
            $justify="space-between"
            $width="100%"
          >
            <DateTime>
              {getOnlyDate(data.createdAt)}. {formatTime(data.createdAt)}
            </DateTime>
            {data.status === "ORDER_CANCELED" && (
              <OrderStatus className="canceld">Canceled</OrderStatus>
            )}
            {data.status === "ORDER_DELIVERED" && (
              <OrderStatus>Completed</OrderStatus>
            )}
          </Flex>

          <Flex $gap={12} $align="center">
            <img src="/person-green.svg" alt={data.clientName} />
            <Flex $direction="column">
              <Name>Client Name</Name>
              <Text>{data.clientName}</Text>
            </Flex>
          </Flex>
          <Flex $gap={12} $align="center">
            <img src="/iphone-green.svg" alt={data.clientPhone} />
            <Flex $direction="column">
              <Name>Phone Number</Name>
              <Text>{data.clientPhone}</Text>
            </Flex>
          </Flex>
          <Flex $gap={12} $align="center">
            <img src="/location-green.svg" alt={data.clientAddress} />
            <Flex $direction="column">
              <Name>Address</Name>
              <Text>{data.clientAddress}</Text>
            </Flex>
          </Flex>
          <Flex $gap={12} $align="center">
            <img src="/wallet-green.svg" alt={data.paymentMethod} />
            <Flex $direction="column">
              <Name>Payment Method</Name>
              <Text>{data.paymentMethod}</Text>
            </Flex>
          </Flex>
          <Flex $gap={12} $align="center">
            <img src="/message-green.svg" alt={data.additionalInfo} />
            <Flex $direction="column">
              <Name>Notes</Name>
              <Text>{data.additionalInfo}</Text>
            </Flex>
          </Flex>
        </IndicatorBoxContainer>
        <IndicatorBoxContainer
          $background="var(--gray10)"
          $customeStyle={css`
            height: auto;
            justify-content: flex-start;
            gap: 12px;
            &:hover {
              background: var(--gray10);
            }
          `}
        >
          {data.orderItems.map((item) => (
            <Flex
              key={item.id}
              $align="center"
              $justify="space-between"
              $gap={16}
              $customStyle={css`
                width: 100%;
                padding-bottom: 12px;
                border-bottom: 1px dashed #dadada;
              `}
            >
              <span style={{ width: "60%" }}>{item.name}</span>
              <span style={{ color: "#666B88", flexShrink: 0 }}>
                x <strong>{item.count}</strong>
              </span>
              <span style={{ flexShrink: 0 }}>
                <strong>{item.price}</strong> L.E
              </span>
            </Flex>
          ))}
          <Flex
            $justify="space-between"
            $width="100%"
            $customStyle={css`
              margin-top: auto;
            `}
          >
            <strong>Total:</strong>
            <span style={{ color: "var(--mainColor)" }}>
              <strong>{data.totalPrice}</strong> L.E
            </span>
          </Flex>
          <Flex $width="100%" $align="center" $gap={8}>
            <MainButton
              title={"Confirm"}
              variant="filled"
              customStyle={css`
                width: 60%;
                border-radius: 10px;
                & p {
                  color: white !important;
                }
                &:hover {
                  background: #0e944b;
                }
              `}
            />
            {data.status !== "ORDER_CANCELED" && (
              <MainButton
                title={"Cancel"}
                colorfilled={"red"}
                customStyle={css`
                  flex: 1;
                  border-radius: 10px;
                  border-color: var(--buttonRed);
                  & p {
                    color: var(--buttonRed) !important;
                  }
                  &:hover {
                    background: var(--buttonRed);
                    & p {
                      color: white !important;
                    }
                  }
                `}
              />
            )}
          </Flex>
        </IndicatorBoxContainer>
      </Grid>
    </Flex>
  );
};

export default OrderOverview;
