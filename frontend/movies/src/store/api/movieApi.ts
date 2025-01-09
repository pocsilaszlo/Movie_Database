import { apiSlice } from './apiSlice';
import type { MovieResponse, Movie } from '../../types/movie';

export const movieApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<MovieResponse, { page: number; size: number }>({
      query: ({ page, size }) => `/movies?page=${page}&size=${size}`,
    }),
    getMovie: builder.query<Movie, string>({
      query: (id) => `/movies/${id}`,
    }),
    getGenres: builder.query<string[], void>({
      query: () => '/genres',
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetGenresQuery,
} = movieApi;