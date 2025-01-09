import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RefreshTokenHandler from "./components/RefreshTokenHandler";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";
import Movies from "./pages/Movies";

const router = createBrowserRouter([
    {
      path: "/",
      element: <RefreshTokenHandler><Layout /></RefreshTokenHandler>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/movie/:id",
          element: <MovieDetails />,
        },
        // Protected routes
        {
          path: "/profile",
          element: <ProtectedRoute><Profile /></ProtectedRoute>,
        },
        {
          path: "/my-list",
          element: <ProtectedRoute><MyList /></ProtectedRoute>,
        }
      ],
    },
  ], {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    },
  });
  
export function Router() {
  return <RouterProvider future={{ v7_startTransition: true}} router={router} />;
}