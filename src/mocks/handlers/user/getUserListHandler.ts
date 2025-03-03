import { delay, http, HttpResponse } from 'msw';
import { UserList } from '@/mocks/db/models/UserList';

export const getUserListHandler = http.get(`${import.meta.env.VITE_API_BASE_URL}/users`, async ({ params }) => {
  await delay(300);

  const page = Number(params.page) || 0;
  const size = Number(params.size) || 100;

  const start = page * size;
  const end = start + size;

  const response = {
    content: UserList.content.slice(start, end),
    size: UserList.size,
    total_elements: UserList.total_elements,
    total_pages: UserList.total_pages,
  };

  return HttpResponse.json(response, {
    status: 200,
  });
});
