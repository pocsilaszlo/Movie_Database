import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../store/store';
import { setCredentials, logout } from '../../store/slices/authSlice';
import { User } from '../../types/auth';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://movies-app-a3601790ae22.herokuapp.com',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});