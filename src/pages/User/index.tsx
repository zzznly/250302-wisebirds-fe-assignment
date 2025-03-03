import React, { useEffect, useState } from 'react';
import { Divider, Typography } from '@mui/material';
import UserService from '@/service/user/UserService';
import CustomDataTable from '@/components/CustomDataTable';
import { UserTableColumns } from '@/components/CustomDataTable/columns/UserTableColumns';
import CustomButton from '@/components/CustomButton';
import useDialog from '@/hooks/useDialog';

const UpdateUserDialog = React.lazy(() => import('@/components/CustomDialog/UpdateUserDialog'));
const CreateUserDialog = React.lazy(() => import('@/components/CustomDialog/CreateUserDialog'));

export default function UserPage() {
  const [userListData, setUserListData] = useState<any>();
  const [userEditData, setUserEditData] = useState<UserListItem>();
  const [page, setPage] = useState(0);

  const fetchUserList = async (page: number, size: number = 25) => {
    try {
      const response = await UserService.getUserList(page, size);
      setUserListData(response.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  const updateUserData = async (updateName: string) => {
    try {
      await UserService.updateUser(userEditData?.id as number, { name: updateName });
      closeEditDialog();
      await fetchUserList(page);
      alert('사용자 정보 수정이 완료되었습니다.');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const createUser = async (data: FormData) => {
    try {
      await UserService.createUser(data);
      closeCreateDialog();
      await fetchUserList(page);
      alert('사용자 생성이 완료되었습니다.');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEditRowData = (rowData: UserListItem) => {
    setUserEditData(rowData);
  };

  useEffect(() => {
    fetchUserList(page);
  }, [page]);

  const { isDialogOpen: isEditDialogOpen, openDialog: openEditDialog, closeDialog: closeEditDialog } = useDialog();
  const {
    isDialogOpen: isCreateDialogOpen,
    openDialog: openCreateDialog,
    closeDialog: closeCreateDialog,
  } = useDialog();
  const tableColumns = UserTableColumns({ openDialog: openEditDialog, onEditRowData: handleEditRowData });

  return (
    <>
      <Typography variant="h6" sx={{ py: 2 }}>
        사용자 관리
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <CustomButton variant="contained" onClick={openCreateDialog}>
        생성
      </CustomButton>
      <CustomDataTable
        rows={userListData?.content}
        columns={tableColumns}
        totalPagesCount={userListData?.total_pages}
        onPageChange={newPage => setPage(newPage)}
        sx={{ mt: 2 }}
      />
      <UpdateUserDialog
        open={isEditDialogOpen}
        onCancel={closeEditDialog}
        userEditData={userEditData}
        onUpdateUser={updateUserData}
      />
      <CreateUserDialog
        open={isCreateDialogOpen}
        onClose={closeCreateDialog}
        onCreateUser={createUser}
        onConfirm={closeCreateDialog}
      />
    </>
  );
}
