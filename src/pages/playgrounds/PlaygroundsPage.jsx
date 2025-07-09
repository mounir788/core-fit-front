import AddButton from "../../components/AddButton";
import Pagination from "../../components/Pagination";
import useGetAllPlaygrounds from "../../hooks/playgrounds/useGetAllPlaygrounds";
import { Flex } from "../../styles/generalStyles";
import PageContent from "./components/PageContent";

const PlaygroundsPage = () => {
  const { data, isLoading, isError } = useGetAllPlaygrounds();

  return (
    <Flex $direction="column" $gap={16}>
      <Flex $justify="space-between" $gap={30} $align="center">
        <h2>Your Playgrounds</h2>
        <AddButton
          title={"Add Playground"}
          link={`/dashboard/playgrounds/add`}
        />
      </Flex>
      <PageContent isLoading={isLoading} isError={isError} data={data} />
      <Pagination totalPages={data?.data?.totalPages || 1} />
    </Flex>
  );
};

export default PlaygroundsPage;
