import AddButton from "../../components/AddButton";
import Pagination from "../../components/Pagination";
import useGetAllMarkets from "../../hooks/markets/useGetAllMarkets";
import { Flex } from "../../styles/generalStyles";
import PageContent from "./components/PageContent";

const StoresPage = () => {
  const { data, isLoading, isError } = useGetAllMarkets();

  return (
    <Flex $direction="column" $gap={16}>
      <Flex $justify="space-between" $gap={30} $align="center">
        <h2>Your Stores</h2>
        <AddButton title={"Add Store"} link={`/dashboard/stores/add`} />
      </Flex>
      <PageContent data={data} isLoading={isLoading} isError={isError} />
      <Pagination totalPages={data?.data?.totalPages || 1} />
    </Flex>
  );
};

export default StoresPage;
