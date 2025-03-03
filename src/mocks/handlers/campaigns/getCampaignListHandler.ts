import { delay, http, HttpResponse } from 'msw';
import { CampaignData } from '@/mocks/db/models/CampaignList';

export const getCampaignListHandler = http.get(`${import.meta.env.VITE_API_BASE_URL}/campaigns`, async ({ params }) => {
  await delay(300);

  const page = Number(params.page) || 0;
  const size = Number(params.size) || 100;

  const start = page * size;
  const end = start + size;

  const response = {
    contents: CampaignData.content.slice(start, end),
    size: CampaignData.size,
    total_elements: CampaignData.total_elements,
    total_pages: CampaignData.total_pages,
  };

  return HttpResponse.json(response, {
    status: 200,
  });
});
