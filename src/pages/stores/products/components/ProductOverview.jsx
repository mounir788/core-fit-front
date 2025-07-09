import { css } from "styled-components";
import { Grid } from "../../../../styles/generalStyles";
import ProductDetails from "./ProductDetails";
import ProductSlider from "./ProductSlider";

const ProductOverview = ({ data, isLoading }) => {
  return (
    <Grid
      $cols={"40% 1fr"}
      $customeStyle={css`
        @media (width <= 768px) {
          display: flex;
          flex-direction: column;
        }
      `}
    >
      <ProductSlider
        images={
          data?.Product?.images?.length > 0 ? data?.Product?.images : [""]
        }
        isLoading={isLoading}
      />

      <ProductDetails isLoading={isLoading} data={data} />
    </Grid>
  );
};

export default ProductOverview;
