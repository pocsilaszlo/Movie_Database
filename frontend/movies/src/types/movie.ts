export interface Movie {
  id: number;
  title: string;
  overview: string;
  imagePath: string;
  certificate: string;
  director: string;
  releaseDate: number;
  runtime: number;
  numberOfVotes: number;
  revenue: number;
  metaScore: number;
  imdbRating: number;
  genres: { name: string }[];
  stars: { name: string }[];
}

export interface MovieResponse {
  content: Movie[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  last: boolean;
  first: boolean;
}