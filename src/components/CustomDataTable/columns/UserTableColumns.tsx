import { Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

export const UserTableColumns: GridColDef[] = [
  {
    field: 'email',
    headerName: '아이디',
    width: 300,
  },
  { field: 'name', headerName: '이름', width: 300 },
  {
    field: 'last_login_at',
    headerName: '마지막 로그인 일시',
    width: 400,
  },
  {
    field: 'id',
    headerName: '수정',
    width: 150,
    renderCell: params => <Button onClick={() => console.log(params.id)}>수정</Button>,
  },
];
