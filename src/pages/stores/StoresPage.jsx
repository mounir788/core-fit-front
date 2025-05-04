import AddButton from "../../components/AddButton";
import { BoxContainer, Flex } from "../../styles/generalStyles";
import PageContent from "./components/PageContent";

const StoresPage = () => {
  return (
    <BoxContainer>
      <Flex $justify="space-between" $gap={30}>
        <h1>Your Stores</h1>
        <AddButton title={"Add Store"} link={`/dashboard/stores/add`} />
      </Flex>
      <PageContent />
    </BoxContainer>
  );
};

export default StoresPage;
