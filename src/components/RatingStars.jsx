/* eslint-disable react/prop-types */
import ReactStars from "react-rating-star-with-type";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import styled from "styled-components";

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  /* color: #e05e0c; */
`;

const StarsText = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  text-align: left;
  color: var(--gray600);
`;

const RatingStars = ({ ratingValue, numberOfRatings, ...props }) => {
  return (
    <StarsContainer>
      <ReactStars
        value={ratingValue}
        size={15}
        filledIcon={<FaStar />}
        emptyIcon={<FaRegStar />}
        halfIcon={<FaStarHalf />}
        // inactiveColor="#E05E0C"
        {...props}
      />
      <StarsText>
        {ratingValue.toFixed(1)} ({numberOfRatings})
      </StarsText>
    </StarsContainer>
  );
};

export default RatingStars;
