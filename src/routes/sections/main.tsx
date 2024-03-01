import { AuthGuard } from 'auth/guard';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SplashScreen } from '../../components/loading-screen';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('pages/Home'));

const Page404 = lazy(() => import('pages/NotFound'));

const AboutPage = lazy(() => import('pages/About'));

const TeamsPage = lazy(() => import('pages/Teams'));

const ResultsPage = lazy(() => import('pages/Results'));

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
      { path: 'home', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'teams', element: <TeamsPage /> },
      { path: 'results/:address', element: <ResultsPage /> },
    ],
  },
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [{ path: '404', element: <Page404 /> }],
  },
];
