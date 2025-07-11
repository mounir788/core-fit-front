import styled, { css } from "styled-components";
import Image from "../../components/Image";
import PageContentLoader from "../../components/PageContentLoader";
import useGetProfileData from "../../hooks/user/useGetProfileData";
import { Flex, Grid } from "../../styles/generalStyles";
import { Skeleton } from "@mui/material";
import MainButton from "../../components/MainButton";
import { useNavigate } from "react-router";

const ProfileContainer = styled.div`
  padding: 90px 30px 30px;
  border-radius: 20px;
  background: linear-gradient(
    to bottom,
    var(--lightGreen) 0px,
    var(--lightGreen) 150px,
    white 150px,
    white 100%
  );
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;
const ProfileImage = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: #f9f9f9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); */
`;

const Name = styled.h3`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.25;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--gray100);
`;

const InfoTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--gray400);
`;

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetProfileData();
  const navigate = useNavigate();

  return (
    <ProfileContainer>
      {!isLoading && !isError && (
        <Flex $direction="column" $gap={16} $wrap="wrap">
          <ProfileImage>
            <Image src={data?.data?.imageUrl} alt={data?.data?.name} />
          </ProfileImage>

          <Name>{data?.data?.username}</Name>
          <Grid $cols="repeat(2, 1fr)">
            <Flex $direction="column" $gap={3}>
              <InfoTitle>Email</InfoTitle>
              <span>{data?.data?.email}</span>
            </Flex>
            <Flex $direction="column" $gap={3}>
              <InfoTitle>Phone Number</InfoTitle>
              <span>{data?.data?.phone}</span>
            </Flex>
            <Flex $direction="column" $gap={3}>
              <InfoTitle>Gender</InfoTitle>
              <span>{data?.data?.gender}</span>
            </Flex>
            <Flex $direction="column" $gap={3}>
              <InfoTitle>Birth Date</InfoTitle>
              <span>{data?.data?.birthDate}</span>
            </Flex>
            <Flex $direction="column" $gap={3}>
              <InfoTitle>Governorate</InfoTitle>
              <span>{data?.data?.governorate}</span>
            </Flex>
            <Flex $direction="column" $gap={3}>
              <InfoTitle>City</InfoTitle>
              <span>{data?.data?.city}</span>
            </Flex>
          </Grid>

          <MainButton
            title={"Update Info"}
            variant="filled"
            customStyle={css`
              width: fit-content;
              margin-top: 40px;
            `}
            onClick={() => navigate("/dashboard/my-profile/edit")}
          />
        </Flex>
      )}

      <PageContentLoader
        isLoading={isLoading}
        isError={isError}
        loadingComponent={
          <Flex $gap={16} $direction="column" $wrap="wrap">
            <ProfileImage>
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"100%"}
                animation="wave"
              />
            </ProfileImage>

            <Grid $cols="repeat(2, 1fr)">
              <Flex $direction="column" $gap={3}>
                <InfoTitle>Email</InfoTitle>
                <Skeleton
                  variant="rectangular"
                  width={"200px"}
                  height={"20px"}
                  style={{ borderRadius: "6px" }}
                  animation="wave"
                />
              </Flex>
              <Flex $direction="column" $gap={3}>
                <InfoTitle>Phone Number</InfoTitle>
                <Skeleton
                  variant="rectangular"
                  width={"150px"}
                  height={"20px"}
                  style={{ borderRadius: "6px" }}
                  animation="wave"
                />
              </Flex>
              <Flex $direction="column" $gap={3}>
                <InfoTitle>Gender</InfoTitle>
                <Skeleton
                  variant="rectangular"
                  width={"100px"}
                  height={"20px"}
                  style={{ borderRadius: "6px" }}
                  animation="wave"
                />
              </Flex>
              <Flex $direction="column" $gap={3}>
                <InfoTitle>Birth Date</InfoTitle>
                <Skeleton
                  variant="rectangular"
                  width={"100px"}
                  height={"20px"}
                  style={{ borderRadius: "6px" }}
                  animation="wave"
                />
              </Flex>
              <Flex $direction="column" $gap={3}>
                <InfoTitle>Governorate</InfoTitle>
                <Skeleton
                  variant="rectangular"
                  width={"100px"}
                  height={"20px"}
                  style={{ borderRadius: "6px" }}
                  animation="wave"
                />
              </Flex>
              <Flex $direction="column" $gap={3}>
                <InfoTitle>City</InfoTitle>
                <Skeleton
                  variant="rectangular"
                  width={"100px"}
                  height={"20px"}
                  style={{ borderRadius: "6px" }}
                  animation="wave"
                />
              </Flex>
            </Grid>

            <Skeleton
              variant="rectangular"
              width={"120px"}
              height={"35px"}
              style={{ borderRadius: "6px", marginTop: "40px" }}
              animation="wave"
            />
          </Flex>
        }
      />
    </ProfileContainer>
  );
};

export default ProfilePage;
