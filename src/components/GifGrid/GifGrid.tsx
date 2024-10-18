import { FC, useRef, KeyboardEvent } from "react";
import { Gif } from "../../utils/types";
import { Card, ErrorIndicator, LoadingIndicator, NoResults } from "..";

import * as Styled from "./gifGrid.styles";
import { KeyboardHelpers } from "../../utils/helpers";

const getCardSiblings = (currentElement: HTMLDivElement) => {
  const currentCell = currentElement.closest('[role="gridcell"]');
  if (!currentCell) return;
  const currentRow = currentCell.parentElement;
  if (!currentRow) return;

  const previousSibling = currentRow.previousElementSibling?.querySelector(
    ".card"
  ) as HTMLElement;
  const nextSibling = currentRow.nextElementSibling?.querySelector(
    ".card"
  ) as HTMLElement;

  return { previousSibling, nextSibling };
};

interface GifGridProps {
  innerRef?: React.RefObject<HTMLDivElement>;
  limit: number;
  loading: boolean;
  error: boolean;
  gifs: Gif[];
  onGifClick: (gif: Gif, element: HTMLElement) => void;
}
export const GifGrid: FC<GifGridProps> = ({
  innerRef,
  limit,
  loading,
  error,
  gifs,
  onGifClick,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isApiResolved = !loading && !error;
  const hasGifs = gifs.length > 0;
  const hasNoResults = !hasGifs && isApiResolved;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { isNext, isPrevious } = KeyboardHelpers.getNavigationInfo(event);
    if (!isNext && !isPrevious) return;

    event.preventDefault();

    const { previousSibling, nextSibling } =
      getCardSiblings(event.target as HTMLDivElement) || {};

    if (isNext) {
      nextSibling?.focus();
    } else {
      previousSibling?.focus();
    }
  };

  return (
    <>
      {hasNoResults ? (
        <NoResults />
      ) : (
        <Styled.MaxHeightContainer ref={innerRef}>
          {loading ? (
            <LoadingIndicator limit={limit} />
          ) : error ? (
            <ErrorIndicator />
          ) : (
            <div role="region" aria-label="GIF search results">
              <Styled.GifGrid
                ref={gridRef}
                role="grid"
                aria-rowcount={gifs.length}
                onKeyDown={handleKeyDown}
              >
                {gifs.map((gif, index) => (
                  <div key={gif.id} role="row" aria-rowindex={index + 1}>
                    <div role="gridcell">
                      <Card
                        gif={gif}
                        onClick={onGifClick}
                        aria-label={`GIF ${index + 1} of ${gifs.length}: ${
                          gif.title
                        }`}
                        className="card"
                      />
                    </div>
                  </div>
                ))}
              </Styled.GifGrid>
            </div>
          )}
        </Styled.MaxHeightContainer>
      )}
    </>
  );
};
