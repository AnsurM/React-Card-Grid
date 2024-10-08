import { FC } from "react";

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
  return (
    <div className="pagination">
      {showPrevious && <button onClick={onClickPrevious}>Previous</button>}
      {showNext && <button onClick={onClickNext}>Next</button>}
    </div>
  );
};
