/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation } from "react-router";
import NavButton from "./NavButton";
import { SidebarContainer, SidebarNavButtonContainer } from "./sidebarUi";
import styled from "styled-components";
import { sideBarLinks } from "./sideBarLinks";
import useLogout from "../../hooks/auth/useLogout";
import Logo from "../../components/Logo";
import { Flex } from "../../styles/generalStyles";
import { LuLogOut } from "react-icons/lu";

const Logout = styled.button`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 10px;
  width: 100%;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--gray300);
  color: var(--buttonRed);
  margin-top: auto;
  cursor: pointer;
`;

const Sidebar = ({ setPageTitle }) => {
  const { pathname } = useLocation();
  const { logout } = useLogout();

  useEffect(() => {
    if (sideBarLinks) {
      const targetRoute = sideBarLinks?.find(
        (route) => route.link === pathname // Exact match
      );
      if (targetRoute) {
        setPageTitle(targetRoute.title);
      }
    }
  }, [pathname]);

  return (
    <SidebarContainer>
      <Flex $align={"center"} $justify={"center"} $gap={16}>
        <Logo size="50px" link="/dashboard" />
      </Flex>
      <SidebarNavButtonContainer>
        {sideBarLinks?.map((sideLink) => (
          <NavButton
            key={sideLink.link}
            title={sideLink.title}
            icon={sideLink.icon}
            link={sideLink.link}
            isActive={pathname === sideLink.link}
            setPageTitle={setPageTitle}
          />
        ))}
        <Logout onClick={logout}>
          <LuLogOut />
          Logout
        </Logout>
      </SidebarNavButtonContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
