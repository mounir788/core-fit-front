import { useParams } from "react-router";
import useGetSingleProduct from "../../../../hooks/products/useGetSingleProduct";
import { BoxContainer, PopupFormTitle } from "../../../../styles/generalStyles";
import ProductForm from "./ProductForm";
import PageContentLoader from "../../../../components/PageContentLoader";

const ProductFormPage = ({ isEditForm = false }) => {
  const { productId } = useParams();
  const { data, isLoading, isError } = useGetSingleProduct(
    productId,
    isEditForm
  );

  return (
    <BoxContainer>
      <PopupFormTitle>
        {isEditForm ? `Update Product (${data?.data?.name})` : "Add Product"}
      </PopupFormTitle>

      {!isLoading && !isError && (
        <ProductForm isEditForm={isEditForm} defaultData={data?.data} />
      )}

      <PageContentLoader isLoading={isLoading} isError={isError} />
    </BoxContainer>
  );
};

export default ProductFormPage;
