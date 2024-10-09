import { FC } from "react";
import SkeletonLoader from "./SkeletonLoader";

import * as Styled from "./loadingIndicator.styles";

export const LoadingIndicator: FC = () => {
  return (
    <Styled.LoadingContainer>
      {new Array(15).fill(0).map((_, index) => (
        <Styled.SkeletonLoaderContainer key={index}>
          <SkeletonLoader />
        </Styled.SkeletonLoaderContainer>
      ))}
    </Styled.LoadingContainer>
  );
};
