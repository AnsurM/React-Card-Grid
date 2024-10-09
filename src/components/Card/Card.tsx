import { FC, useState, KeyboardEvent, useRef } from "react";
import { CARD_TITLE_LENGTH } from "../../utils/constants";
import { Gif } from "../../utils/types";
import { SkeletonLoader } from "..";

import * as Styled from "./card.styles";

interface CardProps {
  gif: Gif;
  onClick: (gif: Gif, element: HTMLElement) => void;
  className?: string;
}

export const Card: FC<CardProps> = ({ gif, onClick, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      onClick(gif, cardRef.current);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <Styled.Card
      ref={cardRef}
      onClick={handleClick}
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
        {gif.title.substring(0, CARD_TITLE_LENGTH)}
        {gif.title.length > CARD_TITLE_LENGTH ? "..." : ""}
      </Styled.Title>
    </Styled.Card>
  );
};
