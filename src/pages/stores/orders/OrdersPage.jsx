import { useParams, useSearchParams } from "react-router";
import PageContentLoader from "../../../components/PageContentLoader";
import { BoxContainer, Flex, Grid } from "../../../styles/generalStyles";
import useGetAllOrders from "../../../hooks/orders/useGetAllOrders";
import OrderCard from "./components/OrderCard";
import styled from "styled-components";

const FilterButton = styled.button`
  padding: 12px 16px;
  background: #fafafa;
  border: 1px solid #f4f4f4;
  cursor: pointer;
  border-radius: 12px;
  position: relative;

  &.active {
    background: var(--mainColor);
    color: white;
  }

  &.new::before {
    content: attr(data-count);
    position: absolute;
    top: 3px;
    right: 3px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--mainColor);
    font-weight: 600;
    font-size: 10px;
    line-height: 100%;
    color: white;
    display: grid;
    place-content: center;
  }
  &.active::before {
    background: white;
    color: var(--mainColor);
  }
`;

const OrdersPage = () => {
  const { data, isLoading, isError } = useGetAllOrders();
  const { storeId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  const changeStatus = (newStatus) => {
    const currentSearchParams = new URLSearchParams(searchParams);

    if (newStatus) {
      currentSearchParams.set("status", newStatus);
    } else currentSearchParams.delete("status");

    setSearchParams(currentSearchParams);
  };

  return (
    <BoxContainer>
      <Flex $direction="column" $gap={16}>
        <Flex $justify="space-between" $gap={30} $wrap="wrap">
          <h1>Orders</h1>
          <Grid $cols="repeat(3, 1fr)" $gap={"10px"}>
            <FilterButton
              onClick={() => changeStatus("new")}
              className={status === "new" ? "active new" : "new"}
              data-count={data?.data?.length}
            >
              New
            </FilterButton>
            <FilterButton
              onClick={() => changeStatus("")}
              className={!status && "active"}
            >
              Current
            </FilterButton>
            <FilterButton
              onClick={() => changeStatus("completed")}
              className={status === "completed" && "active"}
            >
              Completed
            </FilterButton>
          </Grid>
        </Flex>
        <Grid $cols="repeat(auto-fit, minmax(300px,1fr))" $gap={"16px"}>
          {!isLoading &&
            !isError &&
            data?.data?.length > 0 &&
            data?.data?.map((item) => <OrderCard key={item.id} data={item} />)}

          <PageContentLoader
            isLoading={isLoading}
            isError={isError}
            loadingComponent={Array.from({ length: 6 }).map((_, i) => (
              <OrderCard isLoading={isLoading} key={i} />
            ))}
            isDataIsEmpty={data?.data?.length === 0}
          />
        </Grid>
      </Flex>
    </BoxContainer>
  );
};

export default OrdersPage;
