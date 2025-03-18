import Service from '../Service';

class UserService extends Service {
  async getUserInfo() {
    return await this.service.get<UserInfo>('/auth/me');
  }
  async getUserList(page: number = 0, size: number = 25) {
    return await this.service.get<ListData<UserListItem>>('/users', { params: { page, size } });
  }
  async createUser(data: FormData) {
    return await this.service.post<{ result: boolean; id: number }>('/users', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  async updateUser(id: number, data: { name: string }) {
    return await this.service.patch<{ result: boolean; id: number }>(`/users/${id}`, data);
  }
  async checkUserEmail(email: string) {
    return await this.service.get<{ result: boolean }>(`/users/${email}/exists`);
  }
}

export default new UserService();
