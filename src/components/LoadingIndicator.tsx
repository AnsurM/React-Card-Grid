import { FC } from "react";
import styled from "styled-components";
import SkeletonLoader from "./SkeletonLoader";

const StyledLoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  justify-items: center;
  padding: 16px;
`;

const StyledSkeletonLoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 5px;
  max-width: 200px;
  max-height: 200px;
`;

export const LoadingIndicator: FC = () => {
  return (
    <StyledLoadingContainer>
      {new Array(15).fill(0).map((_, index) => (
        <StyledSkeletonLoaderContainer key={index}>
          <SkeletonLoader />
        </StyledSkeletonLoaderContainer>
      ))}
    </StyledLoadingContainer>
  );
};
