interface CampaignListItem {
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective: keyof typeof CAMPAIGN_OBJECTIVES;
  impressions: string | number;
  clicks: string | number;
  ctr: string;
  video_views: string | number;
  vtr: string;
}
