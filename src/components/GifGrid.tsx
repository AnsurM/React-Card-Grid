import { FC, useRef, useEffect, KeyboardEvent } from "react";
import { Gif } from "../types";
import { Card, ErrorIndicator, LoadingIndicator, NoResults } from "./";

import * as Styled from "./gifGrid.styles";

interface GifGridProps {
  limit: number;
  loading: boolean;
  error: boolean;
  gifs: Gif[];
  onGifClick: (gif: Gif) => void;
}

export const GifGrid: FC<GifGridProps> = ({
  limit,
  loading,
  error,
  gifs,
  onGifClick,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const hasNoResults = gifs.length === 0 && !loading && !error;

  useEffect(() => {
    if (!loading && !error && gifs.length > 0) {
      gridRef.current?.focus();
    }
  }, [loading, error, gifs]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentElement = document.activeElement;
    if (!currentElement || !currentElement.parentElement) return;

    const currentCell = currentElement.closest('[role="gridcell"]');
    if (!currentCell) return;

    const currentRow = currentCell.parentElement;
    if (!currentRow) return;

    const rows = Array.from(
      gridRef.current?.querySelectorAll('[role="row"]') || []
    );
    const currentRowIndex = rows.indexOf(currentRow);

    switch (event.key) {
      case "ArrowRight":
        (
          currentRow.nextElementSibling?.querySelector(
            '[role="gridcell"]'
          ) as HTMLElement
        )?.focus();
        break;
      case "ArrowLeft":
        (
          currentRow.previousElementSibling?.querySelector(
            '[role="gridcell"]'
          ) as HTMLElement
        )?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        (
          rows[currentRowIndex + 1]?.querySelector(
            '[role="gridcell"]'
          ) as HTMLElement
        )?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        (
          rows[currentRowIndex - 1]?.querySelector(
            '[role="gridcell"]'
          ) as HTMLElement
        )?.focus();
        break;
    }
  };

  return (
    <>
      {hasNoResults ? (
        <NoResults />
      ) : (
        <Styled.MaxHeightContainer>
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
                    <div role="gridcell" tabIndex={0}>
                      <Card
                        gif={gif}
                        onClick={onGifClick}
                        aria-label={`GIF ${index + 1} of ${gifs.length}: ${
                          gif.title
                        }`}
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
