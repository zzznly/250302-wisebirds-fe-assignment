import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CAMPAIGN_OBJECTIVES } from '@/constants';
import { Switch } from '@mui/material';

export const CampaignTableColumns = (
  userRole: string,
  handleSwitchChange: (id: number, checked: boolean) => void
): GridColDef[] => {
  const renderEnabledSwitch = (params: GridRenderCellParams<any, any>) => (
    <Switch
      checked={Boolean(params.row.enabled)}
      disabled={userRole === 'viewer'}
      onChange={(e, checked) => handleSwitchChange(params.row.id, checked)}
    />
  );

  return [
    {
      field: 'enabled',
      headerName: '상태',
      width: 150,
      renderCell: renderEnabledSwitch,
    },
    { field: 'name', headerName: '캠페인명', width: 150 },
    {
      field: 'campaign_objective',
      headerName: '캠페인 목적',
      width: 150,
      valueFormatter: ({ value }) => CAMPAIGN_OBJECTIVES[value] ?? '',
    },
    { field: 'impressions', headerName: '노출수', width: 150 },
    { field: 'clicks', headerName: '클릭수', width: 150 },
    { field: 'ctr', headerName: 'CTR', width: 150 },
    { field: 'video_views', headerName: '동영상조회수', width: 150 },
    { field: 'vtr', headerName: 'VTR', width: 150 },
  ];
};
