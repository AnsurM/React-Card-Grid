import { FC, useRef, useEffect, KeyboardEvent } from "react";
import { Gif } from "../../utils/types";
import { Card, ErrorIndicator, LoadingIndicator, NoResults } from "..";

import * as Styled from "./gifGrid.styles";

interface GifGridProps {
  limit: number;
  loading: boolean;
  error: boolean;
  gifs: Gif[];
  onGifClick: (gif: Gif, element: HTMLElement) => void;
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

    switch (event.key) {
      case "ArrowUp":
      case "ArrowRight":
        event.preventDefault();
        (
          currentRow.nextElementSibling?.querySelector(".card") as HTMLElement
        )?.focus();
        break;
      case "ArrowDown":
      case "ArrowLeft":
        event.preventDefault();
        (
          currentRow.previousElementSibling?.querySelector(
            ".card"
          ) as HTMLElement
        )?.focus();
        break;
      default:
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
