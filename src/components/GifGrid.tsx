import { FC } from "react";
import { Gif } from "../types";
import { Card } from "./Card";

interface GifGridProps {
  gifs: Gif[];
  onGifClick: (gif: Gif) => void;
}

export const GifGrid: FC<GifGridProps> = ({ gifs, onGifClick }) => {
  return (
    <div className="grid">
      {gifs.map((gif) => (
        <Card key={gif.id} gif={gif} onClick={onGifClick} />
      ))}
    </div>
  );
};
