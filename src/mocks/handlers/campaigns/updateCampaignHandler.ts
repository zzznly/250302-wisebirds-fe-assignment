import { delay, http, HttpResponse } from 'msw';
import { CampaignData } from '@/mocks/db/models/CampaignList';

// /api/campaigns/:id PATCH
// Request Body: { enabled: boolean }
// Response Body: { result: boolean, id: number }

export const updateCampaignHandler = http.patch(
  `${import.meta.env.VITE_API_BASE_URL}/campaigns/:id`,
  async ({ params, json }) => {
    await delay(300);

    const campaignId = Number(params.id);
    const { enabled } = await json<{ enabled: boolean }>();

    const campaignIndex = CampaignData.content.findIndex(campaign => campaign.id === campaignId);
    if (campaignIndex === -1) {
      return HttpResponse.status(404).json({
        message: 'Campaign not found',
      });
    }

    CampaignData.content[campaignIndex].enabled = enabled;

    const response = {
      result: true,
      id: campaignId,
    };

    return HttpResponse.json(response, {
      status: 200,
    });
  }
);
