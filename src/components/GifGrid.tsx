import { FC } from "react";
import { Gif } from "../types";
import { Card } from "./Card";

import * as Styled from "./gifGrid.styles";

interface GifGridProps {
  gifs: Gif[];
  onGifClick: (gif: Gif) => void;
}

export const GifGrid: FC<GifGridProps> = ({ gifs, onGifClick }) => {
  return (
    <Styled.GifGrid>
      {gifs.map((gif) => (
        <Card key={gif.id} gif={gif} onClick={onGifClick} />
      ))}
    </Styled.GifGrid>
  );
};
