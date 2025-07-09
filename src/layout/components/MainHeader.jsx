/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import UserWelcoming from "./UserWelcoming";
import { Flex, PageTitle } from "../../styles/generalStyles";
import Logo from "../../components/Logo";
import NotificationIcon from "./NotificationIcon";
// import NotificationIcon from "./NotificationIcon";
// import { useLocation } from "react-router";
// import SecondHeader from "../../../components/SecondHeader";

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  /* border-radius: 0.625rem; */
  /* background: white;
  box-shadow: 0px 39px 15px rgba(140, 140, 140, 0.01),
  0px 22px 13px rgba(140, 140, 140, 0.04),
  0px 10px 10px rgba(140, 140, 140, 0.06),
  0px 2px 5px rgba(140, 140, 140, 0.07); */
  box-shadow: 0px 2px 5px rgba(38, 38, 38, 0.07);

  @media (width<= 768px) {
    background: white;
    justify-content: flex-end;
    .hamburger-menu {
      display: inline;
      flex-shrink: 0;
    }
  }

  @media (width> 768px) {
    .hamburger-menu {
      display: none;
    }
  }
`;

const UserAndNotificationIconContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const MainHeader = ({ pageTitle }) => {
  // const { pathname } = useLocation();
  // const breads = pathname
  //   .split("/")
  //   .slice(1)
  //   .map((name, index, array) => ({
  //     title: name.replace(/-/g, " ").toUpperCase(),
  //     link:
  //       name === "edit"
  //         ? `/${array.join("/")}`
  //         : `/${array.slice(0, index + 1).join("/")}`,
  //   }));
  return (
    <HeaderWrapper>
      <Flex $align="center" $justify="space-between">
        <PageTitle className="title">{pageTitle}</PageTitle>
        <Flex
          $align={"center"}
          $justify={"center"}
          $gap={16}
          $customStyle={css`
            @media (width > 992px) {
              display: none;
            }
          `}
        >
          <Logo size="40px" link="/dashboard" />
          <PageTitle>Core Fit</PageTitle>
        </Flex>
        <UserAndNotificationIconContainer>
          <NotificationIcon />
          <UserWelcoming />
        </UserAndNotificationIconContainer>
      </Flex>

      {/* {breads.length > 1 && <SecondHeader breads={breads} />} */}
    </HeaderWrapper>
  );
};

export default MainHeader;
