import { delay, http, HttpResponse } from 'msw';
import { UserInfo } from '@/mocks/db/models/UserInfo';

export const getUserInfoHandler = http.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, async () => {
  await delay(300);

  return HttpResponse.json(UserInfo, {
    status: 200,
  });
});
