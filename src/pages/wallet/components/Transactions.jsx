import styled from "styled-components";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import PageContentLoader from "../../../components/PageContentLoader";
import useGetAllTransactions from "../../../hooks/wallet/useGetAllTransactions";
import Pagination from "../../../components/Pagination";
import { Skeleton } from "@mui/material";

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TransactionItem = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-left: 5px solid
    ${(props) => (props.type === "DEPOSIT" ? "#4caf50" : "#f44336")};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  .icon {
    background: ${(props) =>
      props.type === "DEPOSIT" ? "#4caf50" : "#f44336"};
    color: #fff;
    border-radius: 50%;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details {
    flex: 1;
  }

  .amount {
    font-weight: bold;
    color: ${(props) => (props.type === "DEPOSIT" ? "#4caf50" : "#f44336")};
  }

  .timestamp {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
  }
`;
const Transactions = () => {
  const { data, isLoading, isError } = useGetAllTransactions();
  return (
    <>
      <TransactionList>
        {!isLoading &&
          !isError &&
          data?.data?.transactions?.map((tx) => (
            <TransactionItem key={tx.id} type={tx.type}>
              <div className="icon">
                {tx.type === "DEPOSIT" ? <FaArrowDown /> : <FaArrowUp />}
              </div>
              <div className="details">
                <div className="amount">
                  {tx.type === "WITHDRAW" ? "-" : "+"} {tx.amount} EGP
                </div>
                <div>{tx.purpose}</div>
                <div className="timestamp">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
              </div>
            </TransactionItem>
          ))}
        <PageContentLoader
          isLoading={isLoading}
          isError={isError}
          loadingComponent={Array.from({ length: 3 }).map((_, i) => (
            <TransactionItem key={i}>
              <Skeleton
                variant="rectangular"
                width={"40px"}
                height={"40px"}
                animation="wave"
                sx={{ borderRadius: "50%" }}
              />
              <div className="details">
                <div className="amount">
                  <Skeleton
                    variant="text"
                    width={"100px"}
                    sx={{ fontSize: "inherit" }}
                    animation="wave"
                  />
                </div>
                <Skeleton
                  variant="text"
                  width={"90%"}
                  sx={{ fontSize: "inherit" }}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width={"75%"}
                  sx={{ fontSize: "inherit" }}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width={"60%"}
                  sx={{ fontSize: "inherit" }}
                  animation="wave"
                />

                <div className="timestamp">
                  <Skeleton
                    variant="text"
                    width={"40%"}
                    sx={{ fontSize: "inherit" }}
                    animation="wave"
                  />
                </div>
              </div>
            </TransactionItem>
          ))}
          isDataIsEmpty={data?.data?.totalElements === 0}
        />
      </TransactionList>
      <Pagination totalPages={data?.data?.totalPages || 1} />
    </>
  );
};

export default Transactions;
