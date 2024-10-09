import { Gif, Pagination } from "../types";
import {
  GIPHY_SEARCH_ENDPOINT,
  GIPHY_TRENDING_ENDPOINT,
} from "./giphyApi.constants";

/**
 * Represents the response structure from the Giphy API.
 */
interface GifResponse {
  /** Array of Gif objects */
  data: Gif[];
  /** Pagination information */
  pagination: Pagination;
  /** Metadata about the API response */
  meta: {
    /** HTTP status code */
    status: number;
    /** Status message */
    msg: string;
    /** Unique response ID */
    response_id: string;
  };
}

/**
 * Parameters for fetching trending GIFs.
 */
interface GetTrendingGifsParams {
  /** Number of results to skip */
  offset: number;
  /** Maximum number of GIFs to return */
  limit: number;
}

/**
 * Fetches trending GIFs from the Giphy API.
 * @param {GetTrendingGifsParams} params - The parameters for the API request (offset, limit).
 * @returns {Promise<GifResponse>} A promise that resolves to the GIF response.
 */
export const getTrendingGifs = async ({
  offset,
  limit,
}: GetTrendingGifsParams): Promise<GifResponse> => {
  const response = await fetch(
    `${GIPHY_TRENDING_ENDPOINT}&limit=${limit}&offset=${offset}&rating=g`
  );
  const data = await response.json();
  return data;
};

/**
 * Parameters for searching GIFs.
 */
interface GetSearchGifsParams {
  /** Search query string */
  query: string;
  /** Number of results to skip */
  offset: number;
  /** Maximum number of GIFs to return */
  limit: number;
}

/**
 * Searches for GIFs using the Giphy API.
 * @param {GetSearchGifsParams} params - The parameters for the API request (query, offset, limit).
 * @returns {Promise<GifResponse>} A promise that resolves to the GIF response.
 */
export const getSearchGifs = async ({
  query,
  offset,
  limit,
}: GetSearchGifsParams): Promise<GifResponse> => {
  const response = await fetch(
    `${GIPHY_SEARCH_ENDPOINT}&q=${query}&limit=${limit}&offset=${offset}&rating=g`
  );
  const data = await response.json();
  return data;
};
