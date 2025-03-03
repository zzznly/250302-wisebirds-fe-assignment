interface CampaignListItem {
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective: keyof typeof CAMPAIGN_OBJECTIVES;
  impressions: number;
  clicks: number;
  ctr: string;
  video_views: number;
  vtr: string;
}
