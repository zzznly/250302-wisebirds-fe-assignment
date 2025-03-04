import { useEffect } from 'react';
import { useAppStore } from '@/stores';
import useDialog from '@/hooks/useDialog';
import CustomDialog from '@/components/CustomDialog';
import { DialogContentText } from '@mui/material';

export default function GlobalErrorDialog() {
  const { error, setError } = useAppStore();
  const { isDialogOpen, openDialog, closeDialog } = useDialog();

  useEffect(() => {
    if (error) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [error]);

  const handleClose = () => {
    setError('');
    closeDialog();
  };

  return (
    <CustomDialog open={isDialogOpen} onConfirm={handleClose} onClose={handleClose}>
      <DialogContentText>
        에러가 발생했습니다.
        <br />
        같은 현상이 발생하면 고객센터로 문의 바랍니다.
        <br />
        *고객센터
        <br />- email: helpdesk@wisebirds.ai
      </DialogContentText>
    </CustomDialog>
  );
}
