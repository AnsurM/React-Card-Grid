import { useEffect, useState } from "react";
import { GifGrid, LoadingIndicator, Modal, Pagination } from "./components";
import { Gif } from "./types";
import { getTrendingGifs } from "./api";
import { ErrorIndicator } from "./components/ErrorIndicator";

import styled from "styled-components";
import { NoResults } from "./components/NoResults";

const LIMIT = 15;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 90vh;
  padding: 2rem;
`;

const MaxHeightContainer = styled.div`
  overflow: scroll;
  width: 100%;
  flex: 1 1 auto;
`;

const StyledHeading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  flex: 0 1 auto;
`;

const StyledPagination = styled.div`
  flex: 0 1 auto;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [gifOffset, setGifOffset] = useState(0);
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);

  const fetchTrendingGifs = async (offset: number) => {
    setLoading(true);
    try {
      const response = await getTrendingGifs({ offset, limit: LIMIT });
      setGifs(response.data);
    } catch (error) {
      console.error("Error fetching trending gifs:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingGifs(gifOffset);
  }, [gifOffset]);

  return (
    <AppContainer>
      <StyledHeading>React Card Grid Challenge</StyledHeading>
      {loading ? (
        <MaxHeightContainer>
          <LoadingIndicator />
        </MaxHeightContainer>
      ) : error ? (
        <MaxHeightContainer>
          <ErrorIndicator />
        </MaxHeightContainer>
      ) : gifs.length > 0 ? (
        <MaxHeightContainer>
          <GifGrid gifs={gifs} onGifClick={setSelectedGif} />
        </MaxHeightContainer>
      ) : (
        <NoResults />
      )}
      {(loading || gifs.length > 0) && (
        <StyledPagination>
          <Pagination
            showPrevious={loading || gifOffset > 0}
            showNext={loading || gifOffset < 486}
            onClickPrevious={() =>
              gifOffset > 0 && setGifOffset(Math.max(0, gifOffset - LIMIT))
            }
            onClickNext={() =>
              gifOffset < 486 && setGifOffset(gifOffset + LIMIT)
            }
          />
        </StyledPagination>
      )}
      {selectedGif && (
        <Modal gif={selectedGif} onClose={() => setSelectedGif(null)} />
      )}
    </AppContainer>
  );
}

export default App;
