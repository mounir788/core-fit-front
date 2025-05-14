import PageContentLoader from "../../../components/PageContentLoader";
import useGetSinglePlayground from "../../../hooks/playgrounds/useGetSinglePlayground";
import { BoxContainer, MainTitle } from "../../../styles/generalStyles";
import PlaygroundOverview from "./PlaygroundOverview";

const SinglePlaygroundPage = () => {
  const { data, isLoading, isError } = useGetSinglePlayground(null, true);
  return (
    <BoxContainer>
      <MainTitle>Playground Overview</MainTitle>

      {!isError && (
        <PlaygroundOverview data={data?.data} isLoading={isLoading} />
      )}

      <PageContentLoader isLoading={isLoading} isError={isError} />
    </BoxContainer>
  );
};

export default SinglePlaygroundPage;
