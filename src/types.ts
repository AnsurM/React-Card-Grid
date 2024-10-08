type GifImageKey = "original" | "fixed_width";
export interface Gif {
  id: string;
  title: string;
  alt_text: string;
  images: {
    [key in GifImageKey]: {
      url: string;
      width: number;
    };
  };
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}
