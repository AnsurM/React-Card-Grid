import { FC, KeyboardEvent } from "react";

import * as Styled from "./pagination.styles";
interface PaginationProps {
  showPrevious: boolean;
  showNext: boolean;
  onClickPrevious: () => void;
  onClickNext: () => void;
}

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
    <Styled.PaginationContainer aria-label="Pagination">
      <Styled.PaginationButton
        onClick={onClickPrevious}
        onKeyDown={(e) => handleKeyDown(e, onClickPrevious)}
        disabled={!showPrevious}
        aria-label="Go to previous page"
        aria-disabled={!showPrevious}
      >
        Previous
      </Styled.PaginationButton>
      <Styled.PaginationButton
        onClick={onClickNext}
        onKeyDown={(e) => handleKeyDown(e, onClickNext)}
        disabled={!showNext}
        aria-label="Go to next page"
        aria-disabled={!showNext}
      >
        Next
      </Styled.PaginationButton>
    </Styled.PaginationContainer>
  );
};
