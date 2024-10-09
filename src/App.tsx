import { useEffect, useState } from "react";
import { GifGrid, LoadingIndicator, Modal, Pagination } from "./components";
import { Gif } from "./types";
import { getTrendingGifs } from "./api";
import { ErrorIndicator } from "./components/ErrorIndicator";

import { NoResults } from "./components/NoResults";
import * as Styles from "./app.styles";

const LIMIT = 15;

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
    <Styles.AppContainer>
      <Styles.StyledHeading>React Card Grid Challenge</Styles.StyledHeading>
      {loading ? (
        <Styles.MaxHeightContainer>
          <LoadingIndicator />
        </Styles.MaxHeightContainer>
      ) : error ? (
        <Styles.MaxHeightContainer>
          <ErrorIndicator />
        </Styles.MaxHeightContainer>
      ) : gifs.length > 0 ? (
        <Styles.MaxHeightContainer>
          <GifGrid gifs={gifs} onGifClick={setSelectedGif} />
        </Styles.MaxHeightContainer>
      ) : (
        <NoResults />
      )}
      {(loading || gifs.length > 0) && (
        <Styles.StyledPagination>
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
        </Styles.StyledPagination>
      )}
      {selectedGif && (
        <Modal gif={selectedGif} onClose={() => setSelectedGif(null)} />
      )}
    </Styles.AppContainer>
  );
}

export default App;
