import { useEffect, useState, useRef } from "react";
import { GifGrid, Modal, Pagination } from "./components";
import {
  GIF_CARDS_LARGE_SCREENS_LIMIT,
  GIF_CARDS_SMALL_SCREENS_LIMIT,
  LARGE_SCREEN_WIDTH,
} from "./utils/constants";
import { Gif, GifsWithTotalCount } from "./utils/types";
import { giphyApi } from "./utils/api";

import * as Styled from "./app.styles";

function App() {
  const [gifCardsLimit, setGifCardsLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [gifData, setGifData] = useState<GifsWithTotalCount>({
    gifs: [],
    total_count: 0,
  });
  const [gifOffset, setGifOffset] = useState(0);
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
  const [focusedCard, setFocusedCard] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const fetchTrendingGifs = async (offset: number, limit: number) => {
    setLoading(true);
    try {
      const response = await giphyApi.getTrendingGifs({ offset, limit });
      setGifData({
        gifs: response.data,
        total_count: response.pagination.total_count,
      });
      setError(false);
    } catch (error) {
      console.error("Error fetching trending gifs:", error);
      setError(true);
      setGifData({ gifs: [], total_count: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // skip api call until mount is complete
    if (gifCardsLimit !== 0) {
      fetchTrendingGifs(gifOffset, gifCardsLimit);
      // Scroll to top when offset changes i.e when user clicks on previous or next button
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Scroll to top when offset changes i.e when user clicks on previous or next button
      if (gridContainerRef.current) {
        gridContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [gifOffset, gifCardsLimit]);

  const handleGifClick = (gif: Gif, element: HTMLElement) => {
    setSelectedGif(gif);
    setFocusedCard(element);
  };

  const onCloseModal = () => {
    setSelectedGif(null);
    if (focusedCard) {
      focusedCard.focus();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= LARGE_SCREEN_WIDTH) {
        setGifCardsLimit(GIF_CARDS_LARGE_SCREENS_LIMIT);
      } else {
        setGifCardsLimit(GIF_CARDS_SMALL_SCREENS_LIMIT);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showPagination = gifData.gifs.length > 0;
  const disableNextButton =
    loading || gifOffset >= gifData.total_count - gifCardsLimit;
  const disablePreviousButton = loading || gifOffset === 0;
  return (
    <Styled.AppContainer ref={containerRef}>
      <Styled.StyledHeading>React Card Grid Challenge</Styled.StyledHeading>
      <GifGrid
        innerRef={gridContainerRef}
        limit={gifCardsLimit}
        loading={loading}
        error={error}
        gifs={gifData.gifs}
        onGifClick={handleGifClick}
      />
      {showPagination && (
        <Styled.StyledPagination>
          <Pagination
            disablePrevious={disablePreviousButton}
            disableNext={disableNextButton}
            onClickPrevious={() => {
              // this calculation ensures that the offset will never be negative
              const previousOffset = Math.max(gifOffset - gifCardsLimit, 0);
              setGifOffset(previousOffset);
            }}
            onClickNext={() => {
              // this calculation ensures that the offset + limit will never be more than the total_count provided by api
              const nextOffset = Math.min(
                gifOffset + gifCardsLimit,
                gifData.total_count - gifCardsLimit
              );
              setGifOffset(nextOffset);
            }}
          />
        </Styled.StyledPagination>
      )}
      {selectedGif && <Modal gif={selectedGif} onClose={onCloseModal} />}
    </Styled.AppContainer>
  );
}

export default App;
