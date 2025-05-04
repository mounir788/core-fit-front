import { css } from "styled-components";
import { Grid } from "../../../../styles/generalStyles";
import ProductDetails from "./ProductDetails";
import ProductSlider from "./ProductSlider";

const ProductOverview = ({ data, isLoading }) => {
  return (
    <Grid
      $cols={"40% 1fr"}
      $customeStyle={css`
        @media (width <= 992px) {
          grid-template-columns: 1fr;
        }
      `}
    >
      <ProductSlider
        images={data?.images?.length > 0 ? data?.images : [""]}
        isLoading={isLoading}
      />

      <ProductDetails isLoading={isLoading} data={data} />
    </Grid>
  );
};

export default ProductOverview;
