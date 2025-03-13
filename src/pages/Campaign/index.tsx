import CampaignService from '@/service/campaigns/CampaignService';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CampaignTableColumns } from '@/components/CustomDataGrid/columns/CampaignGridColumns';
import CustomDataGrid from '@/components/CustomDataGrid';

export default function CampaignPage() {
  const [campaignData, setCampaignData] = useState<ListData<CampaignListItem>>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchCampaignList(page);
  }, [page]);

  const fetchCampaignList = async (page: number, size: number = 25) => {
    try {
      const response = await CampaignService.getCampaignList(page, size);
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
      await fetchCampaignList(page);
      alert('캠페인 상태 변경이 완료되었습니다.');
    } catch (error) {
      console.error('Error updating campaign enabled state:', error);
      alert('캠페인 상태 변경이 실패했습니다.');
    }
  };

  const handleSwitchChange = (id: number, checked: boolean) => {
    updateCampaignEnabledState(id, checked);
  };

  const tableColumns = CampaignTableColumns(handleSwitchChange);
  const tableRows = campaignData?.content ?? [];

  return (
    <>
      <Typography variant="h6" sx={{ py: 2 }}>
        캠페인 관리
      </Typography>
      <CustomDataGrid
        rows={tableRows}
        columns={tableColumns}
        totalPagesCount={campaignData?.total_pages}
        onPageChange={newPage => setPage(newPage)}
      />
    </>
  );
}
