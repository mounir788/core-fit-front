/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  CancelIconContainer,
  ResponsiveSidebarContainer,
  ResponsiveSidebarlogoAndCancelIconContanier,
  LogoImage,
  SidebarNavButtonContainer,
} from "./sidebarUi";
import { useLocation } from "react-router";

import NavButton from "./NavButton";
import { IoClose } from "react-icons/io5";
import ResponsiveSidebarLogoutButton from "../../../components/ResponsiveSidebarLogoutButton";
import useHandleClickOutside from "../../../hooks/custom-hooks/useHandleClickOutside";
import { sideBarLinks } from "../../../hooks/sidebar/sideBarLinks";

const ResponsiveSidebar = ({
  setPageTitle,
  isResponsiveSidebarOpen,
  closeResponsiveSidebar,
  setIsResponsiveSidebarOpen,
}) => {
  const { targetRef } = useHandleClickOutside(setIsResponsiveSidebarOpen);
  const [isExpanded] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (sideBarLinks && sideBarLinks?.linksList) {
      const targetRoute = sideBarLinks?.linksList.find(
        (route) =>
          route.link === pathname ||
          (pathname.includes(route.link) && route.link !== "/") // Exact match
      );
      if (targetRoute) {
        setPageTitle(targetRoute.title);
      }
    } else if (sideBarLinks) {
      const targetRoute = sideBarLinks?.find(
        (route) =>
          route.link === pathname ||
          (pathname.includes(route.link) && route.link !== "/") // Exact match
      );
      if (targetRoute) {
        setPageTitle(targetRoute.title);
      }
    }
  }, [pathname]);

  return (
    <>
      <ResponsiveSidebarContainer
        ref={targetRef}
        initial={{ x: 1000 }}
        animate={{
          x: isResponsiveSidebarOpen ? 0 : 1000,
        }}
        transition={{
          type: "tween",
        }}
      >
        <ResponsiveSidebarlogoAndCancelIconContanier>
          <CancelIconContainer>
            <IoClose size={30} onClick={closeResponsiveSidebar} />
          </CancelIconContainer>
          <LogoImage src="/logo.png" alt="arcplan logo" />
        </ResponsiveSidebarlogoAndCancelIconContanier>
        <SidebarNavButtonContainer>
          {sideBarLinks?.map((sideLink) => (
            <NavButton
              key={sideLink.link}
              title={sideLink.title}
              icon={sideLink.icon}
              link={sideLink.link}
              activeIcon={sideLink.activeIcon}
              linksList={sideLink.linksList}
              isActive={
                sideLink.linksList
                  ? sideLink.linksList.some(
                      (link) =>
                        pathname === link.link ||
                        pathname.startsWith(`${link.link}/`)
                    )
                  : pathname === sideLink.link ||
                    pathname.startsWith(`${sideLink.link}/`)
              }
              isExpanded={isExpanded}
              setPageTitle={setPageTitle}
              closeResponsiveSidebar={closeResponsiveSidebar}
            />
          ))}
          <ResponsiveSidebarLogoutButton />
        </SidebarNavButtonContainer>
      </ResponsiveSidebarContainer>
    </>
  );
};

export default ResponsiveSidebar;
