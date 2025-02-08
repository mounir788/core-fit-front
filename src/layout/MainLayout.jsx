import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import MainHeader from "./components/MainHeader";
import styled from "styled-components";
// import ResponsiveSidebar from "./components/ResponsiveSidebar";

const MainWrapper = styled.div`
  width: 100%;
  height: 100dvh;
  position: relative;
`;

const SidebarAndPageWrapper = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  @media (width<= 768px) {
    grid-template-columns: 1fr;
  }
`;

const PageContentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  /* padding: 1rem; */
  display: grid;
  grid-template-rows: auto 1fr;
  /* gap: 1rem; */
`;

const OutletWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: auto;
  border-radius: 0.625rem;
  padding: 1rem;
`;

const MainLayout = () => {
  const [pageTitle, setPageTitle] = useState("");
  const [isResponsiveSidebarOpen, setIsResponsiveSidebarOpen] = useState(false);

  const switchOpenResponsiveSidebar = () => {
    setIsResponsiveSidebarOpen(!isResponsiveSidebarOpen);
  };

  const closeResponsiveSidebar = () => {
    setIsResponsiveSidebarOpen(false);
  };

  return (
    <MainWrapper>
      <SidebarAndPageWrapper>
        <Sidebar setPageTitle={setPageTitle} />

        {/* <ResponsiveSidebar
          setPageTitle={setPageTitle}
          isResponsiveSidebarOpen={isResponsiveSidebarOpen}
          closeResponsiveSidebar={closeResponsiveSidebar}
          setIsResponsiveSidebarOpen={setIsResponsiveSidebarOpen}
        /> */}

        <PageContentWrapper>
          <MainHeader
            pageTitle={pageTitle}
            switchOpenResponsiveSidebar={switchOpenResponsiveSidebar}
          />

          <OutletWrapper>
            <Outlet />
          </OutletWrapper>
        </PageContentWrapper>
      </SidebarAndPageWrapper>
    </MainWrapper>
  );
};

export default MainLayout;
