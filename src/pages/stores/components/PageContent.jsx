import Card from "../../../components/Card";
import PageContentLoader from "../../../components/PageContentLoader";
import { Grid } from "../../../styles/generalStyles";

const PageContent = ({ data, isLoading, isError }) => {
  return (
    <Grid $cols="repeat(auto-fill, minmax(300px, 1fr))">
      {!isLoading &&
        !isError &&
        data?.data?.markets?.length > 0 &&
        data?.data?.markets?.map((item) => (
          <Card
            key={item.id}
            data={item}
            link={`/dashboard/stores/${item.id}`}
          />
        ))}

      <PageContentLoader
        isLoading={isLoading}
        isError={isError}
        loadingComponent={Array.from({ length: 3 }).map((_, i) => (
          <Card isLoading={isLoading} key={i} />
        ))}
        isDataIsEmpty={data?.data?.markets?.length === 0}
      />
    </Grid>
  );
};

export default PageContent;
