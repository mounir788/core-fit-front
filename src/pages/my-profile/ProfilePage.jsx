import styled from "styled-components";
import Image from "../../components/Image";
import PageContentLoader from "../../components/PageContentLoader";
import useGetProfileData from "../../hooks/user/useGetProfileData";
import { BoxContainer, Flex, MainTitle } from "../../styles/generalStyles";
import { Skeleton } from "@mui/material";

const ProfileImage = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 2px solid var(--mainColor);
  background-color: #f9f9f9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetProfileData();

  return (
    <BoxContainer>
      <MainTitle>Profile Overview</MainTitle>

      {!isLoading && !isError && (
        <Flex $align="center" $gap={16} $wrap="wrap">
          <ProfileImage>
            <Image src={data?.data?.imageUrl} alt={data?.data?.name} />
          </ProfileImage>

          <Flex $direction="column" $gap={3}>
            <strong>{data?.data?.username}</strong>
            <span>{data?.data?.phone}</span>
            <span>{data?.data?.email}</span>
          </Flex>
        </Flex>
      )}

      <PageContentLoader
        isLoading={isLoading}
        isError={isError}
        loadingComponent={
          <Flex $gap={16} $wrap="wrap">
            <ProfileImage>
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"100%"}
                animation="wave"
              />
            </ProfileImage>
          </Flex>
        }
      />
    </BoxContainer>
  );
};

export default ProfilePage;
