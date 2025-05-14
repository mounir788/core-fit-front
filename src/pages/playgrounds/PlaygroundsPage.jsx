import AddButton from "../../components/AddButton";
import { Flex } from "../../styles/generalStyles";
import PageContent from "./components/PageContent";

const PlaygroundsPage = () => {
  return (
    <Flex $direction="column" $gap={16}>
      <Flex $justify="space-between" $gap={30} $align="center">
        <h2>Your Playgrounds</h2>
        <AddButton
          title={"Add Playground"}
          link={`/dashboard/playgrounds/add`}
        />
      </Flex>
      <PageContent />
    </Flex>
  );
};

export default PlaygroundsPage;
