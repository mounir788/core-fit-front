import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import styled from "styled-components";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";

const PaginationButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;

  margin-top: 20px;

  @media (width <= 768px) {
    gap: 10px;
  }
`;

const PaginationButton = styled.button`
  border: none;
  outline: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: transparent;
  display: grid;
  place-content: center;

  font-weight: 500;
  font-size: 16px;
  text-align: center;
  background: var(--mainColor);
  color: white;

  transition: all 300ms ease-in-out;

  &:hover {
    background: var(--gray950);
  }

  &:disabled {
    background: var(--gray200);
    pointer-events: none;
  }

  /* @media only screen and (max-width: 768px) {
    width: 46px;
    height: 46px;
    font-size: 18px;
  } */
`;

const NumberButton = styled(PaginationButton)`
  color: ${(props) => (props.$is_active ? "white" : "var(--gray800)")};
  background: ${(props) =>
    props.$is_active ? "var(--mainColor)" : "var(--gray100)"};
  &:hover {
    background-color: var(--mainColor);
    color: white;
  }
`;

const Pagination = ({ totalPages, sectionRef }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    () => parseInt(searchParams.get("page")) || 1
  );

  const [pagesInfo, setPagesInfo] = useState([]);
  const hasInteractedRef = useRef(false);

  const makePagesArray = () => {
    const arr = [];
    for (let i = 1; i < totalPages + 1; i++) {
      arr.push(i);
    }

    setPagesInfo(arr);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      hasInteractedRef.current = true;

      setCurrentPage((p) => p + 1);
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: currentPage + 1,
      });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      hasInteractedRef.current = true;

      setCurrentPage((p) => p - 1);
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: currentPage - 1,
      });
    }
  };

  const goToPageNumber = (page) => {
    hasInteractedRef.current = true;

    setCurrentPage(page);
    setSearchParams({ ...Object.fromEntries(searchParams), page });
  };

  useEffect(() => {
    makePagesArray();
  }, [totalPages]);

  useEffect(() => {
    const scrollToSection = () => {
      if (sectionRef?.current) {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    if (hasInteractedRef.current) {
      scrollToSection();
    }
  }, [searchParams.get("page"), sectionRef]);

  // useEffect(() => {
  //   goToPageNumber(1);
  //   // setSearchParams({ ...Object.fromEntries(searchParams), page: 1 });
  // }, [pageSize]);

  return (
    <PaginationButtonsWrapper>
      <PaginationButton onClick={goToPrevPage} disabled={currentPage === 1}>
        <HiChevronLeft size={30} />
      </PaginationButton>

      {pagesInfo?.map((page, index) => {
        if (page <= 3 && currentPage < 4) {
          return (
            <NumberButton
              key={uuidv4()}
              $is_active={currentPage === page}
              onClick={() => {
                goToPageNumber(page);
              }}
            >
              <p>{page}</p>
            </NumberButton>
          );
        }

        if (
          page <= currentPage &&
          (currentPage === totalPages
            ? currentPage - page < 4
            : currentPage - page < 3)
        ) {
          return (
            <NumberButton
              key={uuidv4()}
              $is_active={currentPage === page}
              onClick={() => {
                goToPageNumber(page);
              }}
            >
              <p>{page}</p>
            </NumberButton>
          );
        }

        // show the last page
        if (page === totalPages) {
          return (
            <NumberButton
              key={uuidv4()}
              $is_active={currentPage === page}
              onClick={() => {
                goToPageNumber(page);
              }}
            >
              <p>{page}</p>
            </NumberButton>
          );
        }

        if (
          index === currentPage + 3 ||
          (currentPage + 4 >= totalPages && index === totalPages - 4) ||
          (currentPage + 3 >= totalPages && index === totalPages - 3) ||
          (currentPage + 2 >= totalPages && index === totalPages - 2) ||
          totalPages === 5
        ) {
          return (
            <NumberButton
              key={uuidv4()}
              // $is_active={currentPage === page}
              onClick={() => {
                goToPageNumber(
                  totalPages === 5 && index === 0 ? 1 : totalPages - 1
                );
              }}
            >
              <p>...</p>
            </NumberButton>
          );
        }
      })}

      <PaginationButton
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        <HiChevronRight size={30} />
      </PaginationButton>
    </PaginationButtonsWrapper>
  );
};

export default Pagination;
