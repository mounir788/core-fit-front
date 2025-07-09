/* eslint-disable react/prop-types */
import styled from "styled-components";
import NotificationBlock from "./NotificationBlock";
import { useNotifications } from "../../hooks/notifications/useNotifications";
import useDelete from "../../hooks/general/useDelete";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
  position: absolute;
  top: calc(100% + 2.3rem);
  right: -5.5rem;
  z-index: 50;
  width: 350px;
  max-height: 400px;
  background: #ffffff;
  box-shadow: 0px 24px 50px rgba(89, 86, 86, 0.05),
    0px 18px 45px rgba(89, 86, 86, 0.08), 0px 12px 32px rgba(89, 86, 86, 0.1);
  border-radius: 10px;
  overflow-y: auto;

  @media (width<=768px) {
    width: max-content;
    max-width: 80vw;
    right: auto;
    right: -50px;
  }
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  max-height: 350px; /* adjust if needed */
`;

const Footer = styled.div`
  width: 100%;
  padding: 10px;
  border-top: 1px solid #eee;
  background: #fff;
  position: sticky;
  bottom: 0;
  text-align: center;
`;

const ClearAllButton = styled.button`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--mainColor);
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingMessage = styled.div`
  width: 100%;
  padding: 10px;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  color: var(--gray500);
`;

const NotificationMenu = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useNotifications();
  const { mutate, isPending } = useDelete("/notifications", [
    ["notifications"],
  ]);

  const allNotifications =
    data?.pages.flatMap((page) => page.notifications) ?? [];
  const isEmpty = !allNotifications.length && !isLoading;

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 5) {
      // near bottom
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  return (
    <Container>
      <ScrollContainer onScroll={handleScroll}>
        {isEmpty && <LoadingMessage>No notifications found.</LoadingMessage>}

        {allNotifications?.map((n) => (
          <NotificationBlock key={n?.id} data={n} />
        ))}

        {(isFetchingNextPage || isLoading) && (
          <LoadingMessage>Loading more...</LoadingMessage>
        )}

        {hasNextPage && !isFetchingNextPage && (
          <button onClick={() => fetchNextPage()}>Load more</button>
        )}
      </ScrollContainer>

      {!isEmpty && (
        <Footer>
          <ClearAllButton onClick={() => mutate(null)} disabled={isPending}>
            Clear All
          </ClearAllButton>
        </Footer>
      )}
    </Container>
  );
};

export default NotificationMenu;
