import { FC } from "react";
import { Gif } from "../types";
import { Card } from "./Card";
import styled from "styled-components";

interface GifGridProps {
  gifs: Gif[];
  onGifClick: (gif: Gif) => void;
}

const StyledGifGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  justify-items: center;
  padding: 16px;
`;

export const GifGrid: FC<GifGridProps> = ({ gifs, onGifClick }) => {
  return (
    <StyledGifGrid>
      {gifs.map((gif) => (
        <Card key={gif.id} gif={gif} onClick={onGifClick} />
      ))}
    </StyledGifGrid>
  );
};
