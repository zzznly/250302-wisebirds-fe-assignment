import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useEffect } from 'react';
import { useAppStore } from '@/stores';
import GlobalErrorDialog from './components/CustomDialog/GlobalErrorDialog';

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
