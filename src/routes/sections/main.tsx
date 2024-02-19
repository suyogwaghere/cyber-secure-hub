import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
// layouts

// components
import { AuthGuard } from "auth/guard";
import Results from "pages/Results";
import { SplashScreen } from "../../components/loading-screen";

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import("pages/Home"));

const Page404 = lazy(() => import("pages/NotFound"));

const AboutPage = lazy(() => import("pages/About"));
// PRODUCT
// const ProductListPage = lazy(() => import("./../pages/product/list"));
// const ProductDetailsPage = lazy(() => import("./../pages/product/details"));
// const ProductCheckoutPage = lazy(() => import("./../pages/product/checkout"));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <AuthGuard>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </AuthGuard>
    ),
    children: [
      { path: "home", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "results/:address", element: <Results /> },
    ],
  },

  // {
  //   element: (
  //     <AuthGuard>
  //       <Suspense fallback={<SplashScreen />}>
  //         <Outlet />
  //       </Suspense>
  //     </AuthGuard>
  //   ),
  //   children: [{ path: "about", element: <AboutPage /> }],
  // },
  // {
  //   element: (
  //     <AuthGuard>
  //       <Suspense fallback={<SplashScreen />}>
  //         <Outlet />
  //       </Suspense>
  //     </AuthGuard>
  //   ),
  //   children: [{ path: "results/:address", element: <Results /> }],
  // },
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [{ path: "404", element: <Page404 /> }],
  },
];
