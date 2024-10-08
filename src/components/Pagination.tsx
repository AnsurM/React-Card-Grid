import { FC, KeyboardEvent } from "react";
import styled from "styled-components";

interface PaginationProps {
  showPrevious: boolean;
  showNext: boolean;
  onClickPrevious: () => void;
  onClickNext: () => void;
}

const PaginationContainer = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin: 1rem;
`;

const PaginationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus {
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }
`;

export const Pagination: FC<PaginationProps> = ({
  showPrevious,
  showNext,
  onClickPrevious,
  onClickNext,
}) => {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    onClick: () => void
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <PaginationContainer aria-label="Pagination">
      <PaginationButton
        onClick={onClickPrevious}
        onKeyDown={(e) => handleKeyDown(e, onClickPrevious)}
        disabled={!showPrevious}
        aria-label="Go to previous page"
        aria-disabled={!showPrevious}
      >
        Previous
      </PaginationButton>
      <PaginationButton
        onClick={onClickNext}
        onKeyDown={(e) => handleKeyDown(e, onClickNext)}
        disabled={!showNext}
        aria-label="Go to next page"
        aria-disabled={!showNext}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};
