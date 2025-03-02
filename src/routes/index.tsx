import { Suspense, lazy } from 'react';
import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Loading from '@/components/Loading';

const Home = lazy(() => import('@/pages/Home'));
const Page = lazy(() => import('@/pages/Page'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const Root = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </MainLayout>
  );
};

const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'page', element: <Page /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export const router = createBrowserRouter(routes);
