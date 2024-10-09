import React from "react";
import * as Styled from "./noResults.styles";

export const NoResults: React.FC = () => {
  return (
    <Styled.NoResults aria-label="No search results">
      <Styled.Icon role="img" aria-hidden="true">
        🔍
      </Styled.Icon>
      <Styled.Message>No results found</Styled.Message>
      <p>Try adjusting your search criteria.</p>
    </Styled.NoResults>
  );
};
