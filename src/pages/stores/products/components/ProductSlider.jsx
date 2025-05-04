import { Skeleton } from "@mui/material";
import GallerySlider from "../../../../components/GallerySlider";
import { Flex, Grid } from "../../../../styles/generalStyles";

const ProductSlider = ({ images, isLoading }) => {
  return isLoading ? (
    <Flex $direction="column" $gap={10}>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={"300px"}
        animation="wave"
      />
      <Grid $cols="repeat(4, 1fr)" $gap={"10px"}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width={"100%"}
            height={"100px"}
            animation="wave"
          />
        ))}
      </Grid>
    </Flex>
  ) : (
    <GallerySlider images={images} />
  );
};

export default ProductSlider;
