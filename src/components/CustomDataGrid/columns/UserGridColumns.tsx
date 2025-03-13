import { formatISODateToDateTimeString } from '@/utils';
import { Button } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

interface UserTableColumnsProps {
  openDialog: () => void;
  onEditRowData: (row: any) => void;
}
export const UserTableColumns = ({ openDialog, onEditRowData }: UserTableColumnsProps): GridColDef[] => {
  const renderEditButton = (params: GridRenderCellParams<any, any>) => {
    const onClickEditButton = () => {
      openDialog();
      onEditRowData(params.row);
    };
    return <Button onClick={onClickEditButton}>수정</Button>;
  };

  return [
    {
      field: 'email',
      headerName: '아이디',
      width: 300,
      align: 'left',
      headerAlign: 'left',
    },
    { field: 'name', headerName: '이름', width: 300, align: 'left', headerAlign: 'left' },
    {
      field: 'last_login_at',
      headerName: '마지막 로그인 일시',
      width: 400,
      align: 'left',
      headerAlign: 'left',
      valueFormatter: params => formatISODateToDateTimeString(params),
    },
    {
      field: 'id',
      headerName: '수정',
      width: 150,
      renderCell: renderEditButton,
      align: 'center',
      headerAlign: 'center',
    },
  ];
};
