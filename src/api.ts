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
