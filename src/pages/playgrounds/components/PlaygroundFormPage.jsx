import { BoxContainer, PopupFormTitle } from "../../../styles/generalStyles";
import PageContentLoader from "../../../components/PageContentLoader";
import useGetSinglePlayground from "../../../hooks/playgrounds/useGetSinglePlayground";
import PlaygroundForm from "./PlaygroundForm";

const PlaygroundFormPage = ({ isEditForm = false }) => {
  const { data, isLoading, isError } = useGetSinglePlayground(null, isEditForm);

  return (
    <BoxContainer>
      <PopupFormTitle>
        {isEditForm
          ? `Update Playground (${data?.data?.name})`
          : "Add Playground"}
      </PopupFormTitle>

      {!isLoading && !isError && (
        <PlaygroundForm isEditForm={isEditForm} defaultData={data?.data} />
      )}

      <PageContentLoader isLoading={isLoading} isError={isError} />
    </BoxContainer>
  );
};

export default PlaygroundFormPage;
