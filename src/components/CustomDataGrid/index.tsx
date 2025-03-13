import React, { useEffect, useState } from 'react';
import { DataGrid, DataGridProps, GridColDef, GridPaginationModel, GridRowModel } from '@mui/x-data-grid';
import { Pagination } from '@mui/material';

interface CustomDataGridProps extends DataGridProps {
  rows: GridRowModel[];
  columns: GridColDef[];
  totalPagesCount?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (newPage: number) => void;
}

export default function CustomDataGrid({
  totalPagesCount = 1,
  page = 0,
  pageSize = 25,
  onPageChange,
  rows,
  columns,
  ...rest
}: CustomDataGridProps) {
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
      {...rest}
      rows={rows}
      columns={columns}
      paginationModel={paginationModel}
      disableRowSelectionOnClick
      slots={{
        pagination: () => (
          <Pagination
            sx={{ m: 'auto' }}
            page={paginationModel.page + 1}
            count={totalPagesCount}
            onChange={handlePaginationChange}
          />
        ),
      }}
    />
  );
}
