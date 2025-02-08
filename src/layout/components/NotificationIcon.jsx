import styled from "styled-components";
import NotificationMenu from "./NotificationMenu";
import useHandleClickOutside from "../../../hooks/custom-hooks/useHandleClickOutside";
import { useEffect, useRef, useState } from "react";
import useGetInfinityNotifications from "../../../hooks/notifications/useGetInfinityNotifications";
import useRealAllNotifications from "../../../hooks/notifications/useRealAllNotifications";
import useGetAllNotifications from "../../../hooks/notifications/useGetAllNotifications";

const RelativeContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray100);
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  &::before {
    content: "";
    width: ${(props) => (props.has_new_notifications ? "15px" : "0")};
    height: ${(props) => (props.has_new_notifications ? "15px" : "0")};
    border-radius: 100%;
    background: #ff161680;
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
  }
`;

const NotificationIcon = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [totalNotificationsSize, setTotalNotificationsSize] = useState(10);

  const { targetRef } = useHandleClickOutside(setShowMenu);

  const { data, fetchNextPage, hasNextPage } = useGetInfinityNotifications();

  const { data: allNotifications } = useGetAllNotifications(
    0,
    totalNotificationsSize
  );

  const { refetch } = useRealAllNotifications();

  const handleOpenMenu = () => {
    setShowMenu(true);
  };

  // Ref to hold the debounce timer
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (showMenu) {
      // Clear any existing timer when the menu is opened
      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      // Set a new timer for the debounce
      debounceTimer.current = setTimeout(() => {
        refetch();
      }, 2000); // Wait 2 seconds before marking as read
    }

    // Cleanup function to clear the timer when component unmounts or dependencies change
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [showMenu]);

  const isAllNotificationsWasRead = () => {
    let isConditionAchived = true;

    for (let i = 0; i < allNotifications?.content?.length; i++) {
      if (!allNotifications?.content[i].read) {
        isConditionAchived = false;
        break;
      }
    }

    return isConditionAchived;
  };

  useEffect(() => {
    if (allNotifications?.totalElements !== totalNotificationsSize) {
      setTotalNotificationsSize(allNotifications?.totalElements);
    }
  }, [allNotifications, totalNotificationsSize]);

  return (
    <>
      <Container
        onClick={handleOpenMenu}
        has_new_notifications={!isAllNotificationsWasRead()}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_8620_15342)">
            <path
              d="M14.9997 3C12.6127 3 10.3235 3.94821 8.63572 5.63604C6.94789 7.32387 5.99968 9.61305 5.99968 12V17.379L4.93918 18.4395C4.72947 18.6493 4.58666 18.9165 4.52881 19.2075C4.47095 19.4984 4.50066 19.7999 4.61416 20.074C4.72767 20.348 4.91988 20.5823 5.16649 20.7471C5.41311 20.9119 5.70305 20.9999 5.99968 21H23.9997C24.2963 20.9999 24.5863 20.9119 24.8329 20.7471C25.0795 20.5823 25.2717 20.348 25.3852 20.074C25.4987 19.7999 25.5284 19.4984 25.4706 19.2075C25.4127 18.9165 25.2699 18.6493 25.0602 18.4395L23.9997 17.379V12C23.9997 9.61305 23.0515 7.32387 21.3636 5.63604C19.6758 3.94821 17.3866 3 14.9997 3ZM14.9997 27C13.8062 27 12.6616 26.5259 11.8177 25.682C10.9738 24.8381 10.4997 23.6935 10.4997 22.5H19.4997C19.4997 23.6935 19.0256 24.8381 18.1817 25.682C17.3377 26.5259 16.1932 27 14.9997 27Z"
              fill="var(--mainColor)"
            />
          </g>
        </svg>
      </Container>
      <RelativeContainer>
        {showMenu && (
          <div ref={targetRef}>
            <NotificationMenu
              data={data}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          </div>
        )}
      </RelativeContainer>
    </>
  );
};

export default NotificationIcon;
