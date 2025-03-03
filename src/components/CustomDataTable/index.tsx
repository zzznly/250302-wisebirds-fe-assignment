import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Pagination, SxProps } from '@mui/material';

interface CustomDataTableProps {
  rows: any[];
  columns: GridColDef[];
  paginationModel?: { pageSize: number; page: number };
  totalPagesCount?: number;
  sx?: SxProps;
}

export default function CustomDataTable({
  rows,
  columns,
  totalPagesCount,
  paginationModel = { pageSize: 25, page: 0 },
  sx,
}: CustomDataTableProps) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel,
        },
      }}
      slots={{
        pagination: ({ paginationProps }) => (
          <Pagination {...paginationProps} count={totalPagesCount} sx={{ mx: 'auto', mt: 2 }} />
        ),
      }}
      sx={sx}
    />
  );
}
