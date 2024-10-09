import { useEffect, useState } from "react";
import { GifGrid, Modal, Pagination } from "./components";
import { Gif } from "./types";
import { getTrendingGifs } from "./api";

import * as Styled from "./app.styles";

const LARGE_SCREEN_LIMIT = 50;
const SMALL_SCREEN_LIMIT = 21;

function App() {
  const [limit, setLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [gifOffset, setGifOffset] = useState(0);
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);

  const fetchTrendingGifs = async (offset: number, limit: number) => {
    setLoading(true);
    try {
      const response = await getTrendingGifs({ offset, limit });
      setGifs(response.data);
    } catch (error) {
      console.error("Error fetching trending gifs:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1919) {
        setLimit(LARGE_SCREEN_LIMIT);
      } else {
        setLimit(SMALL_SCREEN_LIMIT);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // skip api call before mount is complete
    if (limit !== 0) fetchTrendingGifs(gifOffset, limit);
  }, [gifOffset, limit]);

  const showPagination = loading || gifs.length > 0;
  return (
    <Styled.AppContainer>
      <Styled.StyledHeading>React Card Grid Challenge</Styled.StyledHeading>
      <GifGrid
        limit={limit}
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
              gifOffset > 0 && setGifOffset(Math.max(0, gifOffset - limit))
            }
            onClickNext={() =>
              gifOffset < 486 && setGifOffset(gifOffset + limit)
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
