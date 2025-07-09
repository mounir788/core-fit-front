import WalletBalance from "./components/WalletBalance";
import { Flex } from "../../styles/generalStyles";
import Transactions from "./components/Transactions";

const WalletPage = () => {
  return (
    <Flex $direction="column" $gap={16}>
      <WalletBalance />

      <Transactions />
    </Flex>
  );
};

export default WalletPage;
