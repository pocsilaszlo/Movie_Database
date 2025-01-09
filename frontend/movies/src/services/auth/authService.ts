import type { AuthResponse } from '../../types/auth';
import { store } from '../../store/store';
import { setCredentials, logout } from '../../store/slices/authSlice';

export const handleAuthSuccess = (response: AuthResponse) => {
  store.dispatch(setCredentials(response));
};

export const handleAuthError = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    return (error.data as { message?: string })?.message || 'Authentication failed';
  }
  return 'An unexpected error occurred';
};

export const handleLogout = () => {
  store.dispatch(logout());
};