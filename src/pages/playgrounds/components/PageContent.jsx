import Card from "../../../components/Card";
import PageContentLoader from "../../../components/PageContentLoader";
import useGetAllPlaygrounds from "../../../hooks/playgrounds/useGetAllPlaygrounds";
import { Grid } from "../../../styles/generalStyles";

const PageContent = () => {
  const { data, isLoading, isError } = useGetAllPlaygrounds();

  return (
    <Grid $cols="repeat(auto-fill, minmax(300px, 1fr))">
      {!isLoading &&
        !isError &&
        data?.data?.playgrounds?.length > 0 &&
        data?.data?.playgrounds?.map((item) => (
          <Card
            key={item.id}
            data={item}
            link={`/dashboard/playgrounds/${item.id}`}
          />
        ))}

      <PageContentLoader
        isLoading={isLoading}
        isError={isError}
        loadingComponent={Array.from({ length: 3 }).map((_, i) => (
          <Card isLoading={isLoading} key={i} />
        ))}
        isDataIsEmpty={data?.data?.playgrounds?.length === 0}
      />
    </Grid>
  );
};

export default PageContent;
