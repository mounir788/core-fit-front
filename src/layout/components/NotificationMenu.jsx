/* eslint-disable react/prop-types */
import styled from "styled-components";
import NotificationBlock from "./NotificationBlock";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  align-items: flex-start;
  padding: 10px;
  gap: 0.625rem;

  position: absolute;
  top: calc(100% + 3.3rem);
  right: -5.5rem;
  z-index: 50;
  width: 23.125rem;
  /* height: 333px; */
  max-height: 20.813rem;
  overflow: auto;

  background: #ffffff;

  box-shadow: 0px 24px 50px rgba(89, 86, 86, 0.05),
    0px 18px 45px rgba(89, 86, 86, 0.08), 0px 12px 32px rgba(89, 86, 86, 0.1);
  border-radius: 10px;

  @media (width<=768px) {
    /* width: 100%; */
    width: max-content;
    max-width: 80vw;
    right: auto;
    left: 0;
    /* max-width: 23.125rem; */
  }
`;

const SeeMoreButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px 0.625rem;
  gap: 0.313rem;

  border-radius: 0.375rem;
`;

const SeeMoreAndLineContainer = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 0.313rem;

  width: auto;
`;

const SeeMore = styled.p`
  /* font-family: Noto Kufi Arabic; */
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 0.75rem;
  text-align: right;
  color: var(--lightBlue);
  /* text-underline-position: from-font;
  text-decoration-skip-ink: none; */
`;

const Line = styled.div`
  width: 100%;

  border: 1px solid var(--lightBlue);
  transform: rotate(-180deg);
`;

const NoNotificationsFounded = styled.p`
  /* font-family: Noto Kufi Arabic; */
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 0.875rem;
  text-align: right;
  /* text-underline-position: from-font;
  text-decoration-skip-ink: none; */
  color: var(--gray700);
`;

const NotificationMenu = ({ data, fetchNextPage, hasNextPage }) => {
  console.log({ notifications: data });
  return (
    <>
      <Container>
        {data?.pages[0]?.content.length > 0 ? (
          data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group?.content?.map((notification) => (
                <NotificationBlock key={notification?.id} data={notification} />
              ))}
            </React.Fragment>
          ))
        ) : (
          <NoNotificationsFounded>
            No notifications founded
          </NoNotificationsFounded>
        )}

        {hasNextPage && (
          <SeeMoreButtonContainer>
            <SeeMoreAndLineContainer onClick={fetchNextPage}>
              <SeeMore>See More</SeeMore>
              <Line />
            </SeeMoreAndLineContainer>
          </SeeMoreButtonContainer>
        )}
      </Container>
    </>
  );
};

export default NotificationMenu;
