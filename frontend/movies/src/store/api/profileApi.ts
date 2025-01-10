import { apiSlice } from './apiSlice';
import type { ChangePasswordRequest, ChangeNameRequest } from '../../types/profile';

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (credentials) => ({
        url: '/profile/changePassword',
        method: 'POST',
        body: credentials,
      }),
    }),
    changeName: builder.mutation<void, ChangeNameRequest>({
      query: (data) => ({
        url: '/profile/changeName',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useChangeNameMutation,
} = profileApi;