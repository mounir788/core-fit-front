import styled from "styled-components";

export const SidebarContainer = styled.aside`
  @media (width > 992px) {
    position: relative;
    width: 15rem;
    max-width: 15rem;
    /* margin: 1rem 0 1rem 1rem; */
    display: flex;
    flex-direction: column;
    background: white;
    padding: 1rem 0.75rem 1em;
    /* border-right: 1px solid var(--gray100); */
    overflow: auto;
    overflow-x: hidden;
    /* border-radius: 0.625rem; */
    gap: 2rem;
    box-shadow: 0px 39px 15px rgba(140, 140, 140, 0.01),
      0px 22px 13px rgba(140, 140, 140, 0.04),
      0px 10px 10px rgba(140, 140, 140, 0.06),
      0px 2px 5px rgba(140, 140, 140, 0.07);
    /* height: 100%; */
  }
  display: none;
`;

export const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  height: 6.25rem;
`;

export const LogoImage = styled.img`
  width: auto;
  height: 4.875rem;
  @media (width<= 768px) {
    width: 95px;
    height: 95px;
  }
`;

export const SidebarNavButtonContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  height: 100%;
  overflow: auto;
  align-items: flex-start;
`;

export const ResponsiveSidebarContainer = styled.aside`
  @media (width<= 768px) {
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    width: 360px;
    height: 100vh;
    padding: 10px;
    gap: 10px;
    z-index: 60;
    background: white;
    box-shadow: 0px 1px 2px 0px #0000000d, 0px 4px 4px 0px #0000000a,
      0px 10px 6px 0px #00000008, 0px 17px 7px 0px #00000003,
      0px 27px 8px 0px #00000000;
  }
  display: none;
`;

export const ResponsiveSidebarlogoAndCancelIconContanier = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid var(--gray300);

  align-items: center;
`;

export const CancelIconContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0px 10px 0px 10px;

  display: flex;
  justify-content: flex-end;
`;
