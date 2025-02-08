/* eslint-disable react/prop-types */
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  /* flex-direction: row; */
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0.625rem;
  gap: 1.25rem;
  grid-template-columns: auto minmax(0px, 1fr);

  width: 100%;
  height: auto;
  /* min-height: 4rem; */

  border-radius: 0.5rem;

  &:hover {
    background: var(--whiteHover);
  }
`;

const IconContainer = styled.div`
  width: 1.563rem;
  height: 1.563rem;
`;

const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */

  gap: 0.625rem;

  width: 100%;
`;

const Title = styled.h6`
  /* font-family: Noto Kufi Arabic; */
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 0.875rem;
  text-align: right;
  /* text-underline-position: from-font;
  text-decoration-skip-ink: none; */
  color: var(--gray700);
`;

const Content = styled.p`
  /* font-family: Noto Kufi Arabic; */
  font-size: 0.625rem;
  font-weight: 500;
  line-height: 1.25rem;
  text-align: right;
  /* text-underline-position: from-font;
  text-decoration-skip-ink: none; */

  color: var(--gray700);
`;

const NotificationBlock = ({ data }) => {
  return (
    <>
      <Container>
        <IconContainer>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.20898 3.125H19.7923C21.5152 3.125 22.9173 4.52708 22.9173 6.25V16.6667C22.9173 18.3896 21.5152 19.7917 19.7923 19.7917H8.91107C8.72253 19.7917 8.53711 19.8427 8.37461 19.9406L3.66211 22.7677C3.49648 22.8677 3.31107 22.9167 3.12565 22.9167C2.94857 22.9167 2.77148 22.8719 2.61211 22.7812C2.28607 22.5969 2.08398 22.25 2.08398 21.875V6.25C2.08398 4.52708 3.48607 3.125 5.20898 3.125ZM8.33398 12.5C7.75898 12.5 7.29232 12.0333 7.29232 11.4583C7.29232 10.8833 7.75898 10.4167 8.33398 10.4167C8.90898 10.4167 9.37565 10.8833 9.37565 11.4583C9.37565 12.0333 8.90898 12.5 8.33398 12.5ZM11.459 11.4583C11.459 12.0333 11.9257 12.5 12.5007 12.5C13.0757 12.5 13.5423 12.0333 13.5423 11.4583C13.5423 10.8833 13.0757 10.4167 12.5007 10.4167C11.9257 10.4167 11.459 10.8833 11.459 11.4583ZM15.6257 11.4583C15.6257 12.0333 16.0923 12.5 16.6673 12.5C17.2423 12.5 17.709 12.0333 17.709 11.4583C17.709 10.8833 17.2423 10.4167 16.6673 10.4167C16.0923 10.4167 15.6257 10.8833 15.6257 11.4583Z"
              fill="#3498DB"
            />
            <mask
              id="mask0_8620_177887"
              //   style="mask-type:luminance"
              maskUnits="userSpaceOnUse"
              x="2"
              y="3"
              width="21"
              height="20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.20898 3.125H19.7923C21.5152 3.125 22.9173 4.52708 22.9173 6.25V16.6667C22.9173 18.3896 21.5152 19.7917 19.7923 19.7917H8.91107C8.72253 19.7917 8.53711 19.8427 8.37461 19.9406L3.66211 22.7677C3.49648 22.8677 3.31107 22.9167 3.12565 22.9167C2.94857 22.9167 2.77148 22.8719 2.61211 22.7812C2.28607 22.5969 2.08398 22.25 2.08398 21.875V6.25C2.08398 4.52708 3.48607 3.125 5.20898 3.125ZM8.33398 12.5C7.75898 12.5 7.29232 12.0333 7.29232 11.4583C7.29232 10.8833 7.75898 10.4167 8.33398 10.4167C8.90898 10.4167 9.37565 10.8833 9.37565 11.4583C9.37565 12.0333 8.90898 12.5 8.33398 12.5ZM11.459 11.4583C11.459 12.0333 11.9257 12.5 12.5007 12.5C13.0757 12.5 13.5423 12.0333 13.5423 11.4583C13.5423 10.8833 13.0757 10.4167 12.5007 10.4167C11.9257 10.4167 11.459 10.8833 11.459 11.4583ZM15.6257 11.4583C15.6257 12.0333 16.0923 12.5 16.6673 12.5C17.2423 12.5 17.709 12.0333 17.709 11.4583C17.709 10.8833 17.2423 10.4167 16.6673 10.4167C16.0923 10.4167 15.6257 10.8833 15.6257 11.4583Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_8620_177887)"></g>
          </svg>
        </IconContainer>

        <TextsContainer>
          <Title>{data?.title}</Title>
          <Content>{data?.content}</Content>
        </TextsContainer>
      </Container>
    </>
  );
};

export default NotificationBlock;
