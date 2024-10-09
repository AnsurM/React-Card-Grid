import { FC, useMemo } from "react";
import { SkeletonLoader } from "../../";

import * as Styled from "./loadingIndicator.styles";

export const LoadingIndicator: FC<{ limit: number }> = ({ limit }) => {
  /**
   * Creates a memoized array of SkeletonLoader components.
   * This optimization prevents unnecessary re-renders when the component updates.
   *
   * @returns {JSX.Element[]} An array of SkeletonLoader components wrapped in styled containers.
   */
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
