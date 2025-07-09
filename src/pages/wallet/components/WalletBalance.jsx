import styled, { css } from "styled-components";
import { TbArrowDownToArc } from "react-icons/tb";
import { Flex } from "../../../styles/generalStyles";
import MainButton from "../../../components/MainButton";
import useGetWalletBalance from "../../../hooks/wallet/useGetWalletBalance";
import { Skeleton } from "@mui/material";

const BalanceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: inset 0px 0px 115px #5abc5d78;

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    font-weight: normal;
    color: #aaa;
  }

  p {
    font-size: 2rem;
    font-weight: bold;
  }
  span {
    font-size: 10px;
    margin-top: 1px;
  }
`;

const WalletBalance = () => {
  const { data, isLoading, isError } = useGetWalletBalance();
  return (
    <BalanceCard>
      <h2>Available Balance</h2>
      {isLoading && (
        <Skeleton
          variant="text"
          width={"40%"}
          sx={{ fontSize: "2rem", margin: "auto" }}
          height={"30px"}
          animation="wave"
        />
      )}
      {!isLoading && !isError && <p>{data?.data?.toFixed(2)} EGP</p>}
      <Flex $direction="column" $align="center">
        <MainButton
          variant="filled"
          title={<TbArrowDownToArc size={22} />}
          isDisabled={isLoading}
          customStyle={css`
            padding: 0;
            min-width: 40px;
            width: 40px;
            height: 40px;
            margin-top: 20px;
          `}
        ></MainButton>
        <span>Withdraw</span>
      </Flex>
    </BalanceCard>
  );
};

export default WalletBalance;
