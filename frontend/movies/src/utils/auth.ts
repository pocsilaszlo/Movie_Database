import type { AuthResponse } from '../types/auth';

export const handleAuthResponse = (response: AuthResponse) => {
  if (!response.user || !response.accessToken) {
    throw new Error('Invalid authentication response');
  }
  return {
    user: response.user,
    accessToken: response.accessToken,
  };
};