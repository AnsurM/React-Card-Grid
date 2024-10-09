import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 90vh;
  max-width: 1920px;
  margin: 0 auto;
  padding: 2rem;
`;

export const StyledHeading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  flex: 0 1 auto;
`;

export const StyledPagination = styled.div`
  flex: 0 1 auto;
`;
