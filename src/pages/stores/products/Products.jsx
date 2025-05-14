import { useParams } from "react-router";
import AddButton from "../../../components/AddButton";
import PageContentLoader from "../../../components/PageContentLoader";
import Pagination from "../../../components/Pagination";
import useGetAllProducts from "../../../hooks/products/useGetAllProducts";
import { Flex, Grid } from "../../../styles/generalStyles";
import CategoriesFilter from "./components/CategoriesFilter";
import ProductCard from "./components/ProductCard";

const Products = () => {
  const { data, isLoading, isError } = useGetAllProducts();
  const { storeId } = useParams();

  return (
    <Flex $direction="column" $gap={16}>
      <Flex $justify="space-between" $gap={30} $align="center">
        <h2>Products</h2>
        <AddButton
          title={"Add Product"}
          link={`/dashboard/stores/${storeId}/products/add`}
        />
      </Flex>
      <CategoriesFilter />
      <Grid $cols="repeat(auto-fill, minmax(167px,1fr))" $gap={"8px"}>
        {!isLoading &&
          !isError &&
          data?.data?.products?.length > 0 &&
          data?.data?.products?.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}

        <PageContentLoader
          isLoading={isLoading}
          isError={isError}
          loadingComponent={Array.from({ length: 10 }).map((_, i) => (
            <ProductCard isLoading={isLoading} key={i} />
          ))}
          isDataIsEmpty={data?.data?.products?.length === 0}
        />
      </Grid>
      <Pagination totalPages={data?.data?.totalPages || 1} />
    </Flex>
  );
};

export default Products;
