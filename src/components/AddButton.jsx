import styled from "styled-components";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px dashed #777777;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.1;
  color: var(--dark);
`;

const AddButton = ({ title, link }) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(link)}>
      <IoIosAddCircleOutline color="var(--mainColor)" size={26} />
      {title}
    </Button>
  );
};

export default AddButton;
