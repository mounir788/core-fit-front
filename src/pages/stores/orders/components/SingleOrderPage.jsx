import { css } from "styled-components";
import PageContentLoader from "../../../../components/PageContentLoader";
import useGetSingleOrder from "../../../../hooks/orders/useGetSingleOrder";
import {
  BoxContainer,
  Flex,
  Grid,
  IndicatorBoxContainer,
  MainTitle,
} from "../../../../styles/generalStyles";
import ProductCard from "../../products/components/ProductCard";
import OrderOverview from "./OrderOverview";
import { Skeleton } from "@mui/material";

const SingleOrderPage = () => {
  const { data, isLoading, isError } = useGetSingleOrder();
  return (
    <BoxContainer>
      <MainTitle>Order Overview</MainTitle>

      {!isError && !isLoading && (
        <OrderOverview data={data?.data} isLoading={isLoading} />
      )}

      <PageContentLoader
        isLoading={isLoading}
        isError={isError}
        loadingComponent={
          <Flex $direction="column" $gap={16}>
            <Grid $cols="repeat(auto-fit, 167px)" $gap={"8px"}>
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductCard isLoading={isLoading} key={i} />
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
                <Flex $gap={12} $align="center">
                  <img src="/person-green.svg" alt={"image"} />
                  <Flex $direction="column">
                    <Skeleton variant="text" width={"80px"} />
                    <Skeleton variant="text" width={"150px"} />
                  </Flex>
                </Flex>
                <Flex $gap={12} $align="center">
                  <img src="/iphone-green.svg" alt={"image"} />
                  <Flex $direction="column">
                    <Skeleton variant="text" width={"80px"} />
                    <Skeleton variant="text" width={"150px"} />
                  </Flex>
                </Flex>
                <Flex $gap={12} $align="center">
                  <img src="/location-green.svg" alt={"image"} />
                  <Flex $direction="column">
                    <Skeleton variant="text" width={"80px"} />
                    <Skeleton variant="text" width={"100px"} />
                  </Flex>
                </Flex>
                <Flex $gap={12} $align="center">
                  <img src="/wallet-green.svg" alt={"image"} />
                  <Flex $direction="column">
                    <Skeleton variant="text" width={"80px"} />
                    <Skeleton variant="text" width={"150px"} />
                  </Flex>
                </Flex>
                <Flex $gap={12} $align="center">
                  <img src="/message-green.svg" alt={"image"} />
                  <Flex $direction="column">
                    <Skeleton variant="text" width={"80px"} />
                    <Skeleton variant="text" width={"150px"} />
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
                {Array.from({ length: 3 }).map((_, i) => (
                  <Flex
                    key={i + "orders"}
                    $align="center"
                    $justify="space-between"
                    $gap={16}
                    $customStyle={css`
                      width: 100%;
                      padding-bottom: 12px;
                      border-bottom: 1px dashed #dadada;
                    `}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={"20px"}
                      sx={{ borderRadius: "8px" }}
                    />
                  </Flex>
                ))}
                <Flex
                  $justify="space-between"
                  $width="100%"
                  $customStyle={css`
                    margin-top: auto;
                  `}
                >
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"20px"}
                    sx={{ borderRadius: "8px" }}
                  />
                </Flex>
              </IndicatorBoxContainer>
            </Grid>
          </Flex>
        }
      />
    </BoxContainer>
  );
};

export default SingleOrderPage;
