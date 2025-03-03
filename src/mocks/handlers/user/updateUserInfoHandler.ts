import { delay, http, HttpResponse } from 'msw';
import { UserList } from '@/mocks/db/models/UserList';

/**
 * Path Param:
 *   - id (int, required) : 사용자 ID
 * Request Body:
 *   - name (string, required) : 사용자 이름
 * Response Body:
 *   - { result: boolean, id: number }
 */

export const updateUserInfoHandler = http.patch(
  `${import.meta.env.VITE_API_BASE_URL}/users/:id`,
  async ({ params, request }) => {
    await delay(300);

    const userId = Number(params.id);
    const { name } = await request.json();

    if (!name) {
      return HttpResponse.status(400).json({
        result: false,
        message: 'Missing required field: name',
      });
    }

    const userIndex = UserList.content.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return HttpResponse.status(404).json({
        result: false,
        message: 'User not found',
      });
    }

    UserList.content[userIndex].name = name;

    const response = {
      result: true,
      id: userId,
    };

    return HttpResponse.json(response, {
      status: 200,
    });
  }
);
