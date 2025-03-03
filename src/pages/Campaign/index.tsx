import CampaignService from '@/service/campaigns/CampaignService';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { CAMPAIGN_OBJECTIVES } from '@/constants';
import { useAppStore } from '@/stores';
import { CampaignTableColumns } from '@/components/CustomDataTable/columns/CampaignTableColumns';
import CustomDataTable from '@/components/CustomDataTable';

export default function CampaignPage() {
  const { userRole } = useAppStore();
  const [campaignData, setCampaignData] = useState<ListData<CampaignListItem>>();

  const handleSwitchChange = (id: number, checked: boolean) => {
    updateCampaignEnabledState(id, checked);
  };

  const fetchCampaignList = async () => {
    try {
      const response = await CampaignService.getCampaignList();
      console.log('fetchCampaignList:', response.data);

      const transformedContents = response.data.content.map((item: CampaignListItem) => ({
        ...item,
        impressions: item.impressions.toLocaleString(),
        clicks: item.clicks.toLocaleString(),
        ctr: `${(Number(item.ctr) * 100).toFixed(2)}%`,
        video_views: item.video_views.toLocaleString(),
        vtr: `${(Number(item.vtr) * 100).toFixed(2)}%`,
      }));

      setCampaignData({
        ...response.data,
        content: transformedContents,
      });
    } catch (error) {
      console.error('Error fetching campaign list:', error);
    }
  };

  const updateCampaignEnabledState = async (id: number, checked: boolean) => {
    try {
      await CampaignService.updateCampaign(id, { enabled: checked });
      await fetchCampaignList();
    } catch (error) {
      console.error('Error updating campaign enabled state:', error);
    }
  };

  useEffect(() => {
    fetchCampaignList();
  }, []);

  const tableColumns = CampaignTableColumns(userRole, handleSwitchChange);
  const tableRows = campaignData?.content ?? [];

  return (
    <Container>
      <Typography variant="h6" sx={{ mt: 8, py: 2 }}>
        캠페인 관리
      </Typography>
      <CustomDataTable columns={tableColumns} rows={tableRows} totalPagesCount={campaignData?.total_pages} />
    </Container>
  );
}
