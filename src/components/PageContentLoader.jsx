import styled from "styled-components";

const FullContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 20rem;
  padding: 30px;
  border-radius: 20px;
  background: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  grid-column: 1 / -1;
  flex: 1;
`;

const Error = styled.p`
  font-size: 1.875rem /* 30px */;
  line-height: 2.25rem /* 36px */;
  color: var(--buttonRed);
`;

const NoResults = styled.p`
  font-weight: 500;
  font-size: 22px;
  line-height: 1.2;
  text-align: center;
  color: var(--gray700);
  text-transform: uppercase;
`;

const PageContentLoader = ({
  isLoading,
  isError,
  isDataIsEmpty = false,
  isDataEmptyMessage = '"There’s no content here yet. Start adding items to display on this page."',
  errorMessage = "Something went wrong",
  loadingComponent,
}) => {
  return (
    <>
      {isLoading && loadingComponent}
      {(isError || isDataIsEmpty) && (
        <FullContainer>
          {isError && <Error>{errorMessage}</Error>}

          {isDataIsEmpty && <NoResults>{isDataEmptyMessage}</NoResults>}
        </FullContainer>
      )}
    </>
  );
};

export default PageContentLoader;
