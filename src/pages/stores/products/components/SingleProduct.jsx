import PageContentLoader from "../../../../components/PageContentLoader";
import useGetSingleProduct from "../../../../hooks/products/useGetSingleProduct";
import { BoxContainer, MainTitle } from "../../../../styles/generalStyles";
import ProductOverview from "./ProductOverview";

const SingleProduct = () => {
  const { data, isLoading, isError } = useGetSingleProduct(null, true);
  return (
    <BoxContainer>
      <MainTitle>Product Overview</MainTitle>

      {!isError && <ProductOverview data={data?.data} isLoading={isLoading} />}

      <PageContentLoader isLoading={isLoading} isError={isError} />
    </BoxContainer>
  );
};

export default SingleProduct;
