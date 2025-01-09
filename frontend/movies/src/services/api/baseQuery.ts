import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../store/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.BACKEND_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});