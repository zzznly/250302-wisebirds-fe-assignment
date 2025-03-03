import Service from '../Service';

class CampaignService extends Service {
  async getCampaignList(page: number = 0, size: number = 25) {
    return await this.service.get('/campaigns', { params: { page, size } });
  }
  async updateCampaign(id: number) {
    return await this.service.patch(`/campaigns/${id}`);
  }
}
export default new CampaignService();
