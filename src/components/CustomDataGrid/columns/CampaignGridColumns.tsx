import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CAMPAIGN_OBJECTIVES } from '@/constants';
import { Switch } from '@mui/material';
import { useAppStore } from '@/stores';

export const CampaignTableColumns = (handleSwitchChange: (id: number, checked: boolean) => void): GridColDef[] => {
  const userRole = useAppStore(state => state.userRole);

  const renderEnabledSwitch = (params: GridRenderCellParams<any, any>) => (
    <Switch
      checked={!!params.row.enabled}
      disabled={userRole === 'viewer'}
      onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
        handleSwitchChange(params.row.id, checked)
      }
    />
  );

  return [
    {
      field: 'enabled',
      headerName: '상태',
      width: 100,
      renderCell: renderEnabledSwitch,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'name', headerName: '캠페인명', width: 150, align: 'left', headerAlign: 'left' },
    {
      field: 'campaign_objective',
      headerName: '캠페인 목적',
      width: 150,
      valueFormatter: params => {
        return CAMPAIGN_OBJECTIVES[params] ?? '';
      },
      align: 'left',
      headerAlign: 'left',
    },
    { field: 'impressions', headerName: '노출수', width: 150, align: 'right', headerAlign: 'right' },
    { field: 'clicks', headerName: '클릭수', width: 150, align: 'right', headerAlign: 'right' },
    { field: 'ctr', headerName: 'CTR', width: 150, align: 'right', headerAlign: 'right' },
    { field: 'video_views', headerName: '동영상조회수', width: 150, align: 'right', headerAlign: 'right' },
    { field: 'vtr', headerName: 'VTR', width: 150, align: 'right', headerAlign: 'right' },
  ];
};
