import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { useRefreshMutation } from '../store/api/authApi';
import { setCredentials } from '../store/slices/authSlice';
import { handleAuthSuccess } from '../services/auth/authService';
import { AuthResponse } from '../types/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshRef = useRef(false); // Ref a refresh kérés állapotának követésére
  const [refresh, { isLoading }] = useRefreshMutation();

  useEffect(() => {
    // Ha nincs accessToken és még nem próbáltuk elindítani a refresh kérést
    if (!accessToken && !refreshRef.current) {
      refreshRef.current = true; // Jelöljük, hogy elindítottuk a refresh kérést
      
      refresh()
        .unwrap() // Az unwrap() egyszerűsíti a válasz kezelését
        .then((response:AuthResponse) => {
          console.log(response);

           handleAuthSuccess(response); // Elmentjük az új access token-t
        })
        .catch((error) => {
          // Ha a refresh kérelem nem sikerült
          if (error.status === 401) {
            console.log("Refresh token expired or invalid (401). Redirecting to login.");
            navigate('/login'); // Ha a refresh token lejárt, átirányítjuk a login oldalra
          } else {
            console.log("Error during refresh:", error);
          }
        })
        .finally(() => {
          refreshRef.current = false; // A refresh kérést lezárjuk
        });
    }

    // Ha nincs accessToken és a refresh még nem próbálkozott, irányítjuk a login oldalra
    if (!accessToken && !refreshRef.current) {
      navigate('/login');
    }
  }, [accessToken, refresh, dispatch, navigate]);

  // Ha az auth guard folyamatban van (pl. token frissítés), akkor nem renderelünk semmit
  if (isLoading || !accessToken) {
    return <div>Loading...</div>;
  }
  
  return <>{children}</>; // Ha sikerült vagy már be vagyunk jelentkezve, megjelenítjük a gyerek komponenseket
};

export default AuthGuard;
