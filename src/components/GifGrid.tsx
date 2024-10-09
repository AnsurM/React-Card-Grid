import { FC } from "react";
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
  const hasNoResults = gifs.length === 0 && !loading && !error;
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
            <Styled.GifGrid>
              {gifs.map((gif) => (
                <Card key={gif.id} gif={gif} onClick={onGifClick} />
              ))}
            </Styled.GifGrid>
          )}
        </Styled.MaxHeightContainer>
      )}
    </>
  );
};
