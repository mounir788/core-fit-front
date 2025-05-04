import { BoxContainer, PopupFormTitle } from "../../../styles/generalStyles";
import StoreForm from "./StoreForm";
import PageContentLoader from "../../../components/PageContentLoader";
import useGetSingleMarket from "../../../hooks/markets/useGetSingleMarket";

const StoreFormPage = ({ isEditForm = false }) => {
  const { data, isLoading, isError } = useGetSingleMarket(null, isEditForm);

  return (
    <BoxContainer>
      <PopupFormTitle>
        {isEditForm
          ? `Update Store (${data?.data?.Market?.name})`
          : "Add Store"}
      </PopupFormTitle>

      {!isLoading && !isError && (
        <StoreForm isEditForm={isEditForm} defaultData={data?.data?.Market} />
      )}

      <PageContentLoader isLoading={isLoading} isError={isError} />
    </BoxContainer>
  );
};

export default StoreFormPage;
