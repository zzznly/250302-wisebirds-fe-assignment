import Service from '../Service';

class UserService extends Service {
  async getUserInfo() {
    return await this.service.get('/auth/me');
  }
  async getUserList(page: number = 0, size: number = 25) {
    return await this.service.get('/users', { params: { page, size } });
  }
  async createUser() {
    return await this.service.post('/users');
  }
  async updateUser(id: number) {
    return await this.service.patch(`/users/${id}`);
  }
  async checkUserEmail(email: string) {
    return await this.service.get(`/users/${email}/exists`);
  }
}

export default new UserService();