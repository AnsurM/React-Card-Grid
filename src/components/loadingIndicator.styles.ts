import styled from "styled-components";

export const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  justify-items: center;
  padding: 16px;
`;

export const SkeletonLoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 5px;
  max-width: 200px;
  max-height: 200px;
`;
