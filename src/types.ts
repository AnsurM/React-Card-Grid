export interface Gif {
  id: string;
  title: string;
  alt_text: string;
  images: {
    original: {
      url: string;
    };
  };
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}
