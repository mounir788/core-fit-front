/* eslint-disable react/prop-types */
import styled from "styled-components";
import UserWelcoming from "./UserWelcoming";
import { Flex } from "../../styles/generalStyles";
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

  @media (width<= 768px) {
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

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--gray700);
`;

const UserAndNotificationIconContainer = styled.div`
  display: flex;
  gap: 0.1rem;
  align-items: center;
`;

const MainHeader = ({ pageTitle, switchOpenResponsiveSidebar }) => {
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
        <PageTitle>{pageTitle}</PageTitle>
        <UserAndNotificationIconContainer>
          {/* <NotificationIcon /> */}
          <UserWelcoming />
        </UserAndNotificationIconContainer>
        <svg
          className="hamburger-menu"
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={switchOpenResponsiveSidebar}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.5 1.50098C0.5 1.10315 0.658035 0.721621 0.93934 0.440317C1.22064 0.159012 1.60218 0.000976562 2 0.000976562H20C20.3978 0.000976562 20.7794 0.159012 21.0607 0.440317C21.342 0.721621 21.5 1.10315 21.5 1.50098C21.5 1.8988 21.342 2.28033 21.0607 2.56164C20.7794 2.84294 20.3978 3.00098 20 3.00098H2C1.60218 3.00098 1.22064 2.84294 0.93934 2.56164C0.658035 2.28033 0.5 1.8988 0.5 1.50098ZM0.5 9.00098C0.5 8.60315 0.658035 8.22162 0.93934 7.94032C1.22064 7.65901 1.60218 7.50098 2 7.50098H11C11.3978 7.50098 11.7794 7.65901 12.0607 7.94032C12.342 8.22162 12.5 8.60315 12.5 9.00098C12.5 9.3988 12.342 9.78033 12.0607 10.0616C11.7794 10.3429 11.3978 10.501 11 10.501H2C1.60218 10.501 1.22064 10.3429 0.93934 10.0616C0.658035 9.78033 0.5 9.3988 0.5 9.00098ZM0.5 16.501C0.5 16.1032 0.658035 15.7216 0.93934 15.4403C1.22064 15.159 1.60218 15.001 2 15.001H20C20.3978 15.001 20.7794 15.159 21.0607 15.4403C21.342 15.7216 21.5 16.1032 21.5 16.501C21.5 16.8988 21.342 17.2803 21.0607 17.5616C20.7794 17.8429 20.3978 18.001 20 18.001H2C1.60218 18.001 1.22064 17.8429 0.93934 17.5616C0.658035 17.2803 0.5 16.8988 0.5 16.501Z"
            fill="#374151"
          />
        </svg>
      </Flex>

      {/* {breads.length > 1 && <SecondHeader breads={breads} />} */}
    </HeaderWrapper>
  );
};

export default MainHeader;
