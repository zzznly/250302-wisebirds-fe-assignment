export const CampaignData = {
  content: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `캠페인${i + 1}`,
    enabled: i % 2 === 0,
    campaign_objective: i % 2 === 0 ? 'WEBSITE_TRAFFIC' : 'LEAD',
    impressions: i * 1000 + 384057,
    clicks: i * 10 + 1974,
    ctr: (i * 0.01 + 0.8752).toFixed(4),
    video_views: i * 10 + 948,
    vtr: (i * 0.01 + 0.95123).toFixed(4),
  })),
  size: 25,
  total_elements: 100,
  total_pages: 4,
};
