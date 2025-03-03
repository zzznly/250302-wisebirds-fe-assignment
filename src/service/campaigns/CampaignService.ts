import Service from '../Service';

class CampaignService extends Service {
  async getCampaignList(page: number = 0, size: number = 25) {
    return await this.service.get<ListData<CampaignListItem>>('/campaigns', { params: { page, size } });
  }
  async updateCampaign(id: number, data: { enabled: boolean }) {
    return await this.service.patch(`/campaigns/${id}`, data);
  }
}
export default new CampaignService();
