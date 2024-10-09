import { FC, useState, KeyboardEvent } from "react";
import { Gif } from "../types";
import { SkeletonLoader } from "./";

import * as Styled from "./card.styles";

interface CardProps {
  gif: Gif;
  onClick: (gif: Gif) => void;
  className?: string;
}

export const Card: FC<CardProps> = ({ gif, onClick, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(gif);
    }
  };

  return (
    <Styled.Card
      onClick={() => onClick(gif)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${gif.title}`}
      className={className}
    >
      {!isLoaded && (
        <Styled.SkeletonContainer>
          <SkeletonLoader />
        </Styled.SkeletonContainer>
      )}
      <Styled.Image
        src={gif.images.fixed_width.url}
        alt=""
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
      <Styled.Title aria-hidden="true">
        {gif.title.substring(0, 30)}
        {gif.title.length > 30 ? "..." : ""}
      </Styled.Title>
    </Styled.Card>
  );
};
