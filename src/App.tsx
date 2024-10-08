import { useEffect, useState } from "react";
import { Card, GifGrid, LoadingIndicator, Modal } from "./components";
import { Gif } from "./types";
import { Pagination } from "./components/Pagination";
import { getTrendingGifs } from "./api";
import { ErrorIndicator } from "./components/ErrorIndicator";

// import styled from 'styled-components';

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
    <AppContainer>
      <h1>React Card Grid Challenge</h1>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        // if we had more time, we would have implemented an ErrorBoundary
        <ErrorIndicator />
      ) : gifs.length > 0 ? (
        <div className="grid-container">
          <GifGrid gifs={gifs} onGifClick={setSelectedGif} />
          <Pagination
            showPrevious={gifOffset > 0}
            showNext={true}
            onClickPrevious={() =>
              gifOffset > 0 && setGifOffset(Math.max(0, gifOffset - LIMIT))
            }
            onClickNext={() => setGifOffset(gifOffset + LIMIT)}
          />
        </div>
      ) : (
        <div>No gifs found</div>
      )}
      {selectedGif && (
        <Modal gif={selectedGif} onClose={() => setSelectedGif(null)} />
      )}
    </>
  );
}

export default App;
