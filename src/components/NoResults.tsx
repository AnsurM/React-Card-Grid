import React from "react";
import styled from "styled-components";

const StyledNoResults = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
`;

const StyledIcon = styled.span`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const StyledMessage = styled.h2`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

export const NoResults: React.FC = () => {
  return (
    <StyledNoResults aria-label="No search results">
      <StyledIcon role="img" aria-hidden="true">
        🔍
      </StyledIcon>
      <StyledMessage>No results found</StyledMessage>
      <p>Try adjusting your search criteria.</p>
    </StyledNoResults>
  );
};
