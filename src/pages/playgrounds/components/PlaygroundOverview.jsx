import { css } from "styled-components";
import { Flex, Grid } from "../../../styles/generalStyles";
import ProductSlider from "../../stores/products/components/ProductSlider";
import PlaygroundDetails from "./PlaygroundDetails";
import { Skeleton } from "@mui/material";
import MapView from "../../../components/MapView";

const PlaygroundOverview = ({ data, isLoading }) => {
  return (
    <Flex $direction="column" $gap={16}>
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
          images={data?.images?.length > 0 ? data?.images : [""]}
          isLoading={isLoading}
        />

        <PlaygroundDetails isLoading={isLoading} data={data} />
      </Grid>
      <div style={{ height: "400px" }}>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"300px"}
            animation="wave"
          />
        ) : (
          <MapView lat={data?.lat} lng={data?.lng} name={data?.name} />
        )}
      </div>
    </Flex>
  );
};

export default PlaygroundOverview;
