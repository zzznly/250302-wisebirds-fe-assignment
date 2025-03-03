import { delay, http, HttpResponse } from 'msw';
import { UserList } from '@/mocks/db/models/UserList';

/**
 * Path Param:
 *   - email (string, required) : 사용자 이메일
 * Response Body:
 *   - { result: boolean }
 */

export const checkUserEmailHandler = http.get(
  `${import.meta.env.VITE_API_BASE_URL}/users/:email/exists`,
  async ({ params }) => {
    await delay(300);

    const { email } = params;
    const userExists = UserList.content.some(user => user.email === email);

    return HttpResponse.json({
      result: userExists,
    });
  }
);
