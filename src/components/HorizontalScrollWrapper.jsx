import { useRef, useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  position: relative;
  height: 100%;

  /* WebKit Browsers */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  color: var(--mainColor);
  font-size: 20px;
  transition: 0.3s;
  box-shadow: 0px 2px 4px 0px #300a0326;
  position: absolute;
  top: 30%;
  cursor: pointer;
  z-index: 100;

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
    left: auto;
  }

  &:hover {
    background: var(--mainColor);
    color: white;
  }

  animation-name: floating;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  @keyframes floating {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @media only screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
`;

const HorizontalScrollWrapper = ({
  children,
  scrollAmount = 200,
  className = "",
  customstyle,
}) => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollIntervalId, setScrollIntervalId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;

      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScrollLeft - 10);
    }
  };

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmountToScroll =
        direction === "left" ? -scrollAmount : scrollAmount;

      containerRef.current.scrollBy({
        left: scrollAmountToScroll,
        behavior: "smooth",
      });
    }
  };

  const startScrolling = (direction) => {
    handleScroll(direction);
    const id = setInterval(() => handleScroll(direction), 250);
    setScrollIntervalId(id);
  };

  const stopScrolling = useCallback(() => {
    if (scrollIntervalId) {
      clearInterval(scrollIntervalId);
      setScrollIntervalId(null);
    }
  }, [scrollIntervalId]);

  // Handle mouse dragging for scrolling

  const handleMouseDown = (e) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setStartY(e.pageY - containerRef.current.offsetTop);
      setScrollLeft(containerRef.current.scrollLeft);
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;
    const walkX = (x - startX) * 2; // Horizontal speed
    const walkY = (y - startY) * 2; // Vertical speed
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollPosition);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
      stopScrolling();
    };
  }, [stopScrolling]);

  useEffect(() => {
    window.addEventListener("resize", checkScrollPosition);
    return () => {
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  useEffect(() => {
    checkScrollPosition();
  }, [containerRef]);

  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        height: "100%",
        overflow: "hidden",
      }}
      className={className}
    >
      {canScrollLeft && (
        <Button
          onMouseDown={() => startScrolling("left")}
          onMouseUp={stopScrolling}
          className={"left"}
        >
          <FaChevronLeft />
        </Button>
      )}
      <TableContainer
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        style={{
          // cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          overflowX: "auto",
        }}
        customstyle={customstyle}
      >
        {children}
      </TableContainer>
      {canScrollRight && (
        <Button
          onMouseDown={() => startScrolling("right")}
          onMouseUp={stopScrolling}
          className={"right"}
        >
          <FaChevronRight />
        </Button>
      )}
    </div>
  );
};

export default HorizontalScrollWrapper;
