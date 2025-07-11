import styled from "styled-components";
import { Flex } from "../../../styles/generalStyles";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 20px;
  min-width: 250px;
  height: fit-content;
  border-radius: 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  flex: 1;

  & p {
    font-size: 12px;
    color: ${({ $increasing }) =>
      $increasing ? "var(--mainColor)" : "var(--buttonRed)"};
  }
`;
const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
`;
const Number = styled.span`
  font-family: "Oswald", sans-serif;
  font-size: 50px;
  font-weight: 500;
  line-height: 1.25;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $increasing }) =>
    $increasing ? "var(--lightGreen)" : "var(--lightRed)"};
  color: ${({ $increasing }) =>
    $increasing ? "var(--mainColor)" : "var(--buttonRed)"};
  display: grid;
  place-content: center;
`;

const TopCard = ({
  title = "Total Orders",
  number = 23,
  increasingValue = 5,
}) => {
  return (
    <Card $increasing={increasingValue > 0}>
      <Flex $gap={10} $align="center" $justify="space-between">
        <Title>{title}</Title>
        <Icon $increasing={increasingValue > 0}>
          {increasingValue > 0 ? (
            <IoIosTrendingUp size={20} />
          ) : (
            <IoIosTrendingDown size={20} />
          )}
        </Icon>
      </Flex>
      <Number>{number}</Number>
      <p>
        {Math.abs(increasingValue)}{" "}
        {increasingValue > 0 ? "increased" : "decreased"} from last month
      </p>
    </Card>
  );
};

export default TopCard;
