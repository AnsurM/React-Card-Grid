import { FC, useState } from "react";
import { Gif } from "../types";
import SkeletonLoader from "./SkeletonLoader";

import * as Styled from "./card.styles";

interface CardProps {
  gif: Gif;
  onClick: (gif: Gif) => void;
}

export const Card: FC<CardProps> = ({ gif, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Styled.Card onClick={() => onClick(gif)}>
      <Styled.SkeletonContainer className={isLoaded ? "loaded" : ""}>
        <SkeletonLoader />
      </Styled.SkeletonContainer>
      <Styled.Image
        src={gif.images.fixed_width.url}
        alt={gif.title}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
      <Styled.Title>
        {gif.title.substring(0, 30)}
        {gif.title.length > 30 ? "..." : ""}
      </Styled.Title>
    </Styled.Card>
  );
};
