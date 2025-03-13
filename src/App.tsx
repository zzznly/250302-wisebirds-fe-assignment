import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { lazy, useEffect } from 'react';
import { useAppStore } from '@/stores';

const GlobalErrorDialog = lazy(() => import('@/components/dialogs/GlobalErrorDialog'));

export default function App() {
  const fetchUserInfo = useAppStore(state => state.fetchUserInfo);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <>
      <RouterProvider router={router} />
      <GlobalErrorDialog />
    </>
  );
}
