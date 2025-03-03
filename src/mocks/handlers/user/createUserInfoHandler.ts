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

  // content-type에 따라 JSON 또는 multipart/form-data로 파싱
  const contentType = request.headers.get('Content-Type') || '';
  let name: string, email: string, password: string, repeat_password: string;

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    name = formData.get('name') as string;
    email = formData.get('email') as string;
    password = formData.get('password') as string;
    repeat_password = formData.get('repeat_password') as string;
  } else {
    ({ name, email, password, repeat_password } = await request.json());
  }

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
  UserList.total_pages = Math.ceil(UserList.total_elements / UserList.size);

  const response = {
    result: true,
    id: newUserId,
  };

  return HttpResponse.json(response, {
    status: 200,
  });
});
