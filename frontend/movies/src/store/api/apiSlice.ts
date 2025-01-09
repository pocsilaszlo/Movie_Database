import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../services/api/baseQuery';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  //baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});