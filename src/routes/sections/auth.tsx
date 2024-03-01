import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
// auth
import { GuestGuard } from "auth/guard";
// layouts

// components
import { SplashScreen } from "components/loading-screen";
import CompactLayout from "layouts/layout";

// ----------------------------------------------------------------------

// JWT
// const LoginPage = lazy(() => import("pages/auth/Login"));
// const RegisterPage = lazy(() => import("pages/auth/Register"));

// FIREBASE
const FirebaseLoginPage = lazy(() => import("pages/auth/firebase/login"));
const FirebaseRegisterPage = lazy(() => import("pages/auth/firebase/register"));
const FirebaseVerifyPage = lazy(() => import("pages/auth/firebase/verify"));
const FirebaseForgotPasswordPage = lazy(
  () => import("pages/auth/firebase/forgot-password")
);

// ----------------------------------------------------------------------

// const authJwt = {
//   path: "jwt",
//   element: (
//     <GuestGuard>
//       <Suspense fallback={<SplashScreen />}>
//         <Outlet />
//       </Suspense>
//     </GuestGuard>
//   ),
//   children: [
//     {
//       path: "login",
//       element: <LoginPage />,
//     },
//     {
//       path: "register",
//       element: <RegisterPage />,
//     },
//   ],
// };
const authFirebase = {
  path: "firebase",
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
      element: (
        <CompactLayout>
          <FirebaseLoginPage />
        </CompactLayout>
      ),
    },
    {
      path: "register",
      element: (
        <CompactLayout>
          <FirebaseRegisterPage />
        </CompactLayout>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: "verify", element: <FirebaseVerifyPage /> },
        { path: "forgot-password", element: <FirebaseForgotPasswordPage /> },
      ],
    },
  ],
};

export const authRoutes = [
  {
    path: "auth",
    children: [authFirebase],
  },
];
