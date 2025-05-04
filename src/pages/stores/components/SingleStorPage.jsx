import { css } from "styled-components";
import {
  BoxContainer,
  Flex,
  Grid,
  IndicatorBoxContainer,
  MainTitle,
} from "../../../styles/generalStyles";
import OrdersBox from "../orders/components/OrdersBox";
import useGetOrders from "../../../hooks/orders/useGetOrders";
import { Link, useParams } from "react-router";
import StoreOverview from "./StoreOverview";

const SingleStorPage = () => {
  const { data: newOrders } = useGetOrders("new");
  const { data: currentOrders } = useGetOrders("current");
  const { data: completedOrders } = useGetOrders("completed");

  const { storeId } = useParams();

  return (
    <BoxContainer>
      <MainTitle>Store Overview</MainTitle>
      <StoreOverview />

      <Flex $gap={16} $wrap="wrap">
        <Grid
          $cols="repeat(2, 1fr)"
          $customeStyle={css`
            flex: 1;
            @media (width <= 480px) {
              grid-template-columns: 1fr;
            }
          `}
        >
          <OrdersBox data={newOrders?.data} />

          <Link to={`/dashboard/stores/${storeId}/products`}>
            <IndicatorBoxContainer>
              <img src={"/products.svg"} alt="products" />
              <p>Products</p>
            </IndicatorBoxContainer>
          </Link>
        </Grid>
        <IndicatorBoxContainer
          $borderColor="var(--lightGreen)"
          $background="var(--midGreen)"
          $minWidth="300px"
          $customeStyle={css`
            flex: 1;
          `}
        >
          <Flex $direction="column" $gap={16} $width="100%">
            <Flex $justify="space-between" $align="center">
              <p>New Orders</p>

              <span>
                <span className="main-color">{newOrders?.data?.length} </span>
                <span>Orders</span>
              </span>
            </Flex>
            <Flex $justify="space-between" $align="center">
              <p>Current Orders</p>

              <span>
                <span className="main-color">
                  {currentOrders?.data?.length}
                </span>{" "}
                <span>Orders</span>
              </span>
            </Flex>
            <Flex $justify="space-between" $align="center">
              <p>Completed Orders</p>

              <span>
                <span className="main-color">
                  {completedOrders?.data?.length}{" "}
                </span>
                <span>Orders</span>
              </span>
            </Flex>
          </Flex>
        </IndicatorBoxContainer>
      </Flex>
    </BoxContainer>
  );
};

export default SingleStorPage;
