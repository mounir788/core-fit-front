import { BoxContainer, PopupFormTitle } from "../../../styles/generalStyles";
import PageContentLoader from "../../../components/PageContentLoader";
import ProfileForm from "./ProfileForm";
import useGetProfileData from "../../../hooks/user/useGetProfileData";

const ProfileFormPage = () => {
  const { data, isLoading, isError } = useGetProfileData();

  return (
    <BoxContainer>
      <PopupFormTitle>{"Update Profile Info"}</PopupFormTitle>

      {!isLoading && !isError && <ProfileForm defaultData={data?.data} />}

      <PageContentLoader isLoading={isLoading} isError={isError} />
    </BoxContainer>
  );
};

export default ProfileFormPage;
