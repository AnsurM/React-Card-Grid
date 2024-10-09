const GIPHY_API_URL = import.meta.env.VITE_GIPHY_API_URL;
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
export const GIPHY_TRENDING_ENDPOINT = `${GIPHY_API_URL}/trending?api_key=${GIPHY_API_KEY}`;
export const GIPHY_SEARCH_ENDPOINT = `${GIPHY_API_URL}/search?api_key=${GIPHY_API_KEY}`;
