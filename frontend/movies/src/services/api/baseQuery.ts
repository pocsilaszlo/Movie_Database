import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../store/store';

const apiUrl = process.env.REACT_APP_API_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});