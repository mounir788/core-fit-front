/* eslint-disable react/prop-types */
import { useState } from "react";
import styled, { css } from "styled-components";
import { FaEnvelope } from "react-icons/fa";
import { HiTrash } from "react-icons/hi"; // Example delete icon
import { Flex } from "../../styles/generalStyles";
import { formatNotificationTime } from "../../utils/formatDate";
import useDelete from "../../hooks/general/useDelete";

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

/* Flip container */
const FlipContainer = styled.div`
  perspective: 1000px;
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  &:hover {
    & > div {
      transform: rotateY(180deg);
    }
  }
`;

/* Common face styles */
const Face = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  backface-visibility: hidden;
  display: grid;
  place-content: center;
  color: white;
`;

/* Front icon face */
const FrontFace = styled(Face)`
  background: var(--mainColor);
`;

/* Back delete icon face */
const BackFace = styled(Face)`
  background: var(--buttonRed);
  transform: rotateY(180deg);
`;

/* Inner flip card container */
const Flipper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
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
  const { mutate, isPending } = useDelete(`/notifications/${data.id}`, [
    ["notifications"],
  ]);

  return (
    <Container
      $isRead={data.isRead}
      onClick={() => setIsMessageExpanded(!isMessageExpanded)}
    >
      <Flex $gap={10}>
        <FlipContainer>
          <Flipper>
            <FrontFace>
              <FaEnvelope />
            </FrontFace>
            <BackFace onClick={() => mutate(null)}>
              <HiTrash />
            </BackFace>
          </Flipper>
        </FlipContainer>

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
