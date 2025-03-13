import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { lazy, useEffect } from 'react';
import UserService from '@/service/user/UserService';
import { useAppStore } from '@/stores';

const GlobalErrorDialog = lazy(() => import('@/components/dialogs/GlobalErrorDialog'));

export default function App() {
  const setUserInfo = useAppStore(state => state.setUserInfo);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await UserService.getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <GlobalErrorDialog />
    </>
  );
}
