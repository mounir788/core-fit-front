import { css } from "styled-components";
import useGetSingleMarket from "../../../hooks/markets/useGetSingleMarket";
import StoreDetails from "./StoreDetails";
import PageContentLoader from "../../../components/PageContentLoader";
import { Grid } from "../../../styles/generalStyles";
import MapView from "../../../components/MapView";
import { Skeleton } from "@mui/material";

const StoreOverview = () => {
  const { data, isLoading, isError } = useGetSingleMarket(null, true);

  return (
    <Grid
      $cols={"40% 1fr"}
      $customeStyle={css`
        @media (width <= 992px) {
          grid-template-columns: 1fr;
        }
      `}
    >
      {!isError && (
        <>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"300px"}
              animation="wave"
            />
          ) : (
            <MapView
              lat={data?.data?.Market?.lat}
              lng={data?.data?.Market?.lng}
              name={data?.data?.Market?.name}
            />
          )}

          <StoreDetails
            isLoading={isLoading}
            data={data?.data?.Market}
            rateCount={data?.data?.rateCount}
            averageRate={data?.data?.averageRate}
          />
        </>
      )}
      <PageContentLoader isLoading={isLoading} isError={isError} />
    </Grid>
  );
};

export default StoreOverview;
