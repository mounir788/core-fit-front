import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import MainHeader from "./components/MainHeader";
import styled from "styled-components";
import { listenToMessages, requestPermission } from "../firebase/service";
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
  @media (width <= 992px) {
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

  useEffect(() => {
    const initializeNotifications = async () => {
      await requestPermission();
      const unsubscribe = listenToMessages();
      return () => {
        if (unsubscribe) unsubscribe();
      };
    };

    initializeNotifications();
  }, []);

  return (
    <MainWrapper>
      <SidebarAndPageWrapper>
        <Sidebar setPageTitle={setPageTitle} />

        <PageContentWrapper>
          <MainHeader pageTitle={pageTitle} />

          <OutletWrapper>
            <Outlet />
          </OutletWrapper>
        </PageContentWrapper>
      </SidebarAndPageWrapper>
    </MainWrapper>
  );
};

export default MainLayout;
