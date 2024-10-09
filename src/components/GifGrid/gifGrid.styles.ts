import styled from "styled-components";

export const GifGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  justify-items: center;
  padding: 16px;
`;

export const MaxHeightContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  flex: 1 1 auto;
`;
