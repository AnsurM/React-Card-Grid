import { FC, useMemo } from "react";
import { SkeletonLoader } from "../../";

import * as Styled from "./loadingIndicator.styles";

export const LoadingIndicator: FC<{ limit: number }> = ({ limit }) => {
  const loadingSkeletonsList = useMemo(() => {
    return new Array(limit).fill(0).map((_, index) => (
      <Styled.SkeletonLoaderContainer key={index}>
        <SkeletonLoader />
      </Styled.SkeletonLoaderContainer>
    ));
  }, [limit]);
  return (
    <Styled.LoadingContainer>{loadingSkeletonsList}</Styled.LoadingContainer>
  );
};
