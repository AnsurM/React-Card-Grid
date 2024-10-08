import { FC, useState } from "react";
import { Gif } from "../types";
import styled from "styled-components";
import SkeletonLoader from "./SkeletonLoader";

interface CardProps {
  gif: Gif;
  onClick: (gif: Gif) => void;
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 200px;
  aspect-ratio: 1/1;
  position: relative;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  &:hover,
  &:focus {
    transform: scale(1.1);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

const StyledSkeletonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 60%;
  &.loaded {
    display: none;
  }
`;

const StyledTitle = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
`;

export const Card: FC<CardProps> = ({ gif, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <StyledCard onClick={() => onClick(gif)}>
      <StyledSkeletonContainer className={isLoaded ? "loaded" : ""}>
        <SkeletonLoader />
      </StyledSkeletonContainer>
      <StyledImage
        src={gif.images.fixed_width.url}
        alt={gif.title}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
      <StyledTitle>
        {gif.title.substring(0, 30)}
        {gif.title.length > 30 ? "..." : ""}
      </StyledTitle>
    </StyledCard>
  );
};
