import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { handleAuthSuccess, handleAuthError, handleLogout } from '../services/auth/authService';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from '../store/api/authApi';


export const useAuth = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  const login = async (email: string, password: string) => {
    try {
      const response = await loginMutation({ email, password }).unwrap();
      handleAuthSuccess(response);
      navigate('/');
      return { success: true };
    } catch (error) {
      return { success: false, error: handleAuthError(error) };
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await registerMutation({ username, email, password }).unwrap();
      navigate('/login');
      return { success: true };
    } catch (error) {
      console.log(error);
      
      return { success: false, error: handleAuthError(error) };
    }
  };

  const performLogout = async () => {
    try {
      await logoutMutation().unwrap();
      handleLogout();
      navigate('/');
      return { success: true };
    } catch (error) {
      console.log(error);
      
      return { success: false, error: handleAuthError(error) };
    }
  };

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    login,
    register,
    logout: performLogout,
  };
};