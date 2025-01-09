import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useRefreshMutation } from '../store/api/authApi';
import { setCredentials } from '../store/slices/authSlice';

interface RefreshTokenHandlerProps {
  children: React.ReactNode;
}

const RefreshTokenHandler: React.FC<RefreshTokenHandlerProps> = ({ children }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshRef = useRef(false);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken && !refreshRef.current) {
        refreshRef.current = true;
        try {
          const response = await refresh().unwrap();
          if (response?.accessToken) {
            dispatch(setCredentials(response));
          }
        } catch (error) {
          console.log('Refresh token failed or expired');
        } finally {
          refreshRef.current = false;
        }
      }
    };

    checkAuth();
  }, [accessToken, refresh, dispatch]);

  return <>{children}</>;
};

export default RefreshTokenHandler;