import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
// auth
import { GuestGuard } from "auth/guard";
// layouts

// components
import { SplashScreen } from "components/loading-screen";

// ----------------------------------------------------------------------

// JWT
const LoginPage = lazy(() => import("pages/auth/Login"));
const RegisterPage = lazy(() => import("pages/auth/Register"));

// ----------------------------------------------------------------------

const authJwt = {
  path: "jwt",
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ],
};

export const authRoutes = [
  {
    path: "auth",
    children: [authJwt],
  },
];
