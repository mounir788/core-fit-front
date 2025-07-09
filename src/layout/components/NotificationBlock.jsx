/* eslint-disable react/prop-types */
import { useState } from "react";
import styled, { css } from "styled-components";
import { FaEnvelope } from "react-icons/fa";
import { Flex } from "../../styles/generalStyles";
import { formatNotificationTime } from "../../utils/formatDate";

const Container = styled.div`
  padding-inline: 0.625rem;
  width: 100%;
  height: auto;
  background: ${({ $isRead }) => ($isRead ? "white" : "var(--gray100)")};
  cursor: pointer;

  & > div {
    padding-block: 0.625rem;
    border-bottom: 1px solid var(--gray200);
  }
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-content: center;
  background: var(--mainColor);
  color: white;
  border-radius: 50%;
  flex-shrink: 0;
`;

const Title = styled.h6`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
`;

const Content = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 1.25;

  ${({ $isMessageExpanded }) =>
    !$isMessageExpanded &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

const Time = styled.span`
  font-size: 10px;
  font-weight: 400;
  line-height: 1.3;
  color: var(--gray400);
`;

const NotificationBlock = ({ data }) => {
  const [isMessageExpanded, setIsMessageExpanded] = useState(false);

  return (
    <Container
      $isRead={data.isRead}
      onClick={() => setIsMessageExpanded(!isMessageExpanded)}
    >
      <Flex $gap={10}>
        <IconContainer>
          <FaEnvelope />
        </IconContainer>
        <Flex $direction="column" $gap={4}>
          <Title>{data?.title}</Title>

          <Content $isMessageExpanded={isMessageExpanded}>
            {data?.message}
          </Content>

          <Time>{formatNotificationTime(data.createdAt)}</Time>
        </Flex>
      </Flex>
    </Container>
  );
};

export default NotificationBlock;
