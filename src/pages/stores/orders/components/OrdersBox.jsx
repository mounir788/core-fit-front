import styled from "styled-components";
import { IndicatorBoxContainer } from "../../../../styles/generalStyles";
import { useNavigate, useParams } from "react-router";

const OrdersCount = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--mainColor);

  font-weight: 700;
  font-size: 1rem;
  color: white;

  z-index: 2;
`;

const OrdersBox = ({ data }) => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  return (
    <IndicatorBoxContainer
      $hasNewOrders={data?.length > 0 && "true"}
      onClick={() => navigate(`/dashboard/stores/${storeId}/orders`)}
    >
      {data?.length > 0 && <OrdersCount>{data?.length}</OrdersCount>}
      <img src={"/orders.svg"} alt="orders" />
      <p>Orders</p>
    </IndicatorBoxContainer>
  );
};

export default OrdersBox;
