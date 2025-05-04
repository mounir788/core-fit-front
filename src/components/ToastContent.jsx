import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { Flex } from "../styles/generalStyles";
import styled from "styled-components";

const Title = styled.span`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
`;

const Message = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.3;
  color: var(--gray700);
`;

export const ToastContent = ({ title, message }) => {
  return (
    <Flex $gap={8} $direction="column" className="w-full">
      <Flex $justify="space-between" $align="center">
        <Title>{title}</Title>
        <button onClick={() => toast.dismiss()}>
          <CgClose />
        </button>
      </Flex>
      <Message>{message}</Message>
    </Flex>
  );
};
