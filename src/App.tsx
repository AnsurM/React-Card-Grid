import { useEffect, useState } from "react";
import { GifGrid, Modal, Pagination } from "./components";
import { Gif } from "./types";
import { getTrendingGifs } from "./api";

import * as Styled from "./app.styles";

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

  const showPagination = loading || gifs.length > 0;
  return (
    <Styled.AppContainer>
      <Styled.StyledHeading>React Card Grid Challenge</Styled.StyledHeading>
      <GifGrid
        loading={loading}
        error={error}
        gifs={gifs}
        onGifClick={setSelectedGif}
      />
      {showPagination && (
        <Styled.StyledPagination>
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
        </Styled.StyledPagination>
      )}
      {selectedGif && (
        <Modal gif={selectedGif} onClose={() => setSelectedGif(null)} />
      )}
    </Styled.AppContainer>
  );
}

export default App;
