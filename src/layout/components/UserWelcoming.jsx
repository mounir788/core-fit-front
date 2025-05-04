import styled from "styled-components";
import { Link } from "react-router";

// import { getUserFromToken } from "../../../utils/isUserLoggedIn";
import { IoChevronDown } from "react-icons/io5";

import { useHandleRefDisplay } from "../../hooks/general/useHandleRefDisplay";
import useLogout from "../../hooks/auth/useLogout";
import useGetProfileData from "../../hooks/user/useGetProfileData";
import Image from "../../components/Image";
import { Skeleton } from "@mui/material";

const UserInfoWrapper = styled.div`
  position: relative;
  min-width: 250px;
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 100px;
  gap: 0.625rem;
  cursor: pointer;
  & svg {
    margin-left: auto;
  }
  &:hover {
    background: var(--lightGreen);
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 100%;
  overflow: hidden;
`;
const TextsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserName = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--gray700);
  text-align: left;
`;
const UserEmail = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.2;
  color: var(--gray500);
  text-align: left;
`;

const Menu = styled.div`
  position: absolute;
  top: 140%;
  left: 0;
  right: 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  box-shadow: 0px 39px 15px rgba(140, 140, 140, 0.01),
    0px 22px 13px rgba(140, 140, 140, 0.04),
    0px 10px 10px rgba(140, 140, 140, 0.06),
    0px 2px 5px rgba(140, 140, 140, 0.07);
  z-index: 999;
`;

const MenuLink = styled(Link)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  color: var(--gray700);

  &:hover {
    background: var(--gray200);
  }
`;

const UserWelcoming = () => {
  const { data, isLoading } = useGetProfileData();

  const { logout } = useLogout();

  const { menuRef, isMenuDisplayed, switchDisplayMenu } = useHandleRefDisplay();

  return (
    <UserInfoWrapper onClick={!isLoading && switchDisplayMenu} ref={menuRef}>
      <UserAvatar>
        {isLoading ? (
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        ) : (
          <Image
            src={data?.data?.imageUrl}
            alt={data?.data?.username}
            isHuman
          />
        )}
      </UserAvatar>
      <TextsWrapper>
        <UserName>
          {isLoading ? (
            <Skeleton
              variant="text"
              sx={{ fontSize: "inherit" }}
              width={"50px"}
            />
          ) : (
            data?.data?.username
          )}
        </UserName>
        <UserEmail>
          {isLoading ? (
            <Skeleton
              variant="text"
              sx={{ fontSize: "inherit" }}
              width={"100px"}
            />
          ) : (
            data?.data?.email
          )}
        </UserEmail>
      </TextsWrapper>
      <IoChevronDown color="var(--gray700)" size={16} />
      {isMenuDisplayed && (
        <Menu>
          <MenuLink to="/dashboard/my-profile">My Profile</MenuLink>
          <MenuLink onClick={logout}>Logout</MenuLink>
        </Menu>
      )}
    </UserInfoWrapper>
  );
};

export default UserWelcoming;
