import { FC } from "react";
import { Gif } from "../types";

interface CardProps {
  gif: Gif;
  onClick: (gif: Gif) => void;
}

export const Card: FC<CardProps> = ({ gif, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(gif)}>
      {gif.title}
    </div>
  );
};
