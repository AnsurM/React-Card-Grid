import { FC, KeyboardEvent } from "react";

import * as Styled from "./pagination.styles";
import { isKeyboardClick } from "../../utils/helpers/keyboardHelpers";
interface PaginationProps {
  disablePrevious: boolean;
  disableNext: boolean;
  onClickPrevious: () => void;
  onClickNext: () => void;
}

export const Pagination: FC<PaginationProps> = ({
  disablePrevious,
  disableNext,
  onClickPrevious,
  onClickNext,
}) => {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    onClick: () => void
  ) => {
    if (isKeyboardClick(event)) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Styled.PaginationContainer aria-label="Pagination">
      <Styled.PaginationButton
        onClick={onClickPrevious}
        onKeyDown={(e) => handleKeyDown(e, onClickPrevious)}
        disabled={disablePrevious}
        aria-label="Go to previous page"
        aria-disabled={disablePrevious}
      >
        Previous
      </Styled.PaginationButton>
      <Styled.PaginationButton
        onClick={onClickNext}
        onKeyDown={(e) => handleKeyDown(e, onClickNext)}
        disabled={disableNext}
        aria-label="Go to next page"
        aria-disabled={disableNext}
      >
        Next
      </Styled.PaginationButton>
    </Styled.PaginationContainer>
  );
};
