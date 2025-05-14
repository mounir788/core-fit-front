import { css } from "styled-components";
import { Grid } from "../../../styles/generalStyles";
import ProductSlider from "../../stores/products/components/ProductSlider";
import PlaygroundDetails from "./PlaygroundDetails";

const PlaygroundOverview = ({ data, isLoading }) => {
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

      <PlaygroundDetails isLoading={isLoading} data={data} />
    </Grid>
  );
};

export default PlaygroundOverview;
