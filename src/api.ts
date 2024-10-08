import { Gif, Pagination } from "./types";

interface GifResponse {
  data: Gif[];
  pagination: Pagination;
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

interface GetTrendingGifsParams {
  offset: number;
  limit: number;
}

export const getTrendingGifs = async ({
  offset,
  limit,
}: GetTrendingGifsParams): Promise<GifResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_GIPHY_API_URL}/trending?api_key=${
      import.meta.env.VITE_GIPHY_API_KEY
    }&limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  return data;
};

interface GetSearchGifsParams {
  query: string;
  offset: number;
  limit: number;
}

export const getSearchGifs = async ({
  query,
  offset,
  limit,
}: GetSearchGifsParams): Promise<GifResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_GIPHY_API_URL}/search?api_key=${
      import.meta.env.VITE_GIPHY_API_KEY
    }&q=${query}&limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  return data;
};
