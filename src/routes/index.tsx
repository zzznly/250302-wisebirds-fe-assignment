import { Suspense, lazy } from 'react';
import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Loading from '@/components/Loading';

const CampaignPage = lazy(() => import('@/pages/Campaign'));
const UserPage = lazy(() => import('@/pages/User'));
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
      { index: true, element: <CampaignPage /> },
      { path: 'user', element: <UserPage /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export const router = createBrowserRouter(routes);
