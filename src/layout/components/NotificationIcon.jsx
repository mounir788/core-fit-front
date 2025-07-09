import styled from "styled-components";
import NotificationMenu from "./NotificationMenu";
import { useState } from "react";
import useHandleClickOutside from "../../hooks/general/useHandleClickOutside";
import useGetUnreadNotificationsCount from "../../hooks/notifications/useGetUnreadNotificationsCount";
import { IoNotifications } from "react-icons/io5";

const RelativeContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  box-shadow: 0px 2px 5px rgba(38, 38, 38, 0.07);

  &::before {
    content: attr(data-count);
    width: 15px;
    height: 15px;
    display: ${(props) => (props.$has_new_notifications > 0 ? "flex" : "none")};
    border-radius: 100%;
    background: #ff1616cf;
    position: absolute;
    top: -0.1rem;
    right: -0.15rem;
    font-size: 10px;
    color: white;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    background: var(--lightGreen);
  }
`;

const NotificationIcon = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data, isLoading, isError } = useGetUnreadNotificationsCount();
  const { targetRef } = useHandleClickOutside(setShowMenu);

  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <Container
        onClick={handleToggleMenu}
        $has_new_notifications={data?.data || 0}
        data-count={
          isLoading || isError ? 0 : data?.data > 10 ? "" : data?.data
        }
      >
        <IoNotifications size={22} color="var(--mainColor)" />
      </Container>
      <RelativeContainer>
        {showMenu && (
          <div ref={targetRef}>
            <NotificationMenu />
          </div>
        )}
      </RelativeContainer>
    </>
  );
};

export default NotificationIcon;
