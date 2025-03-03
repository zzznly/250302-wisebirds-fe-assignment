import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Pagination, SxProps } from '@mui/material';

interface CustomDataTableProps {
  rows: any[];
  columns: GridColDef[];
  totalPagesCount?: number;
  sx?: SxProps;
  page?: number;
  pageSize?: number;
  onPageChange?: (newPage: number) => void;
}

export default function CustomDataTable({
  rows,
  columns,
  totalPagesCount = 1,
  sx,
  page = 0,
  pageSize = 25,
  onPageChange,
}: CustomDataTableProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page,
    pageSize,
  });

  useEffect(() => {
    setPaginationModel(prev => ({
      ...prev,
      page,
      pageSize,
    }));
  }, [page, pageSize]);

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, newPage: number) => {
    const dataGridPage = newPage - 1;
    setPaginationModel(prev => ({ ...prev, page: dataGridPage }));
    onPageChange?.(dataGridPage);
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={model => {
        setPaginationModel(model);
        onPageChange?.(model.page);
      }}
      slots={{
        pagination: () => (
          <Pagination
            sx={{ mx: 'auto', mt: 2 }}
            page={paginationModel.page + 1}
            count={totalPagesCount}
            onChange={handlePaginationChange}
          />
        ),
      }}
      sx={sx}
    />
  );
}
