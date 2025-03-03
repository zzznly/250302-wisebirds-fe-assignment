import { delay, http, HttpResponse } from 'msw';
import { UserList } from '@/mocks/db/models/UserList';

/**
 * Request Body:
 *   - name (string, required)
 *   - email (string, required)
 *   - password (string, required)
 *   - repeat_password (string, required)
 * Response Body:
 *   - { result: boolean, id: number }
 */

export const createUserInfoHandler = http.post(`${import.meta.env.VITE_API_BASE_URL}/users`, async ({ request }) => {
  await delay(300);

  const { name, email, password, repeat_password } = await request.json();

  if (!name || !email || !password || !repeat_password) {
    return HttpResponse.status(400).json({
      result: false,
      message: 'Missing required fields',
    });
  }

  if (password !== repeat_password) {
    return HttpResponse.status(400).json({
      result: false,
      message: 'Passwords do not match',
    });
  }

  const newUserId = UserList.content.length + 1;
  const newUser: UserListItem = {
    id: newUserId,
    name,
    email,
    last_login_at: new Date().toISOString(),
  };
  UserList.content.push(newUser);
  UserList.total_elements += 1;

  const response = {
    result: true,
    id: newUserId,
  };

  return HttpResponse.json(response, {
    status: 200,
  });
});
