import { useEffect } from 'react';
import { useAppStore } from '@/stores';
import { DialogContentText } from '@mui/material';
import useDialog from '@/hooks/useDialog';
import BaseDialog from './BaseDialog';

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
    <BaseDialog open={isDialogOpen} onConfirm={handleClose} onClose={handleClose}>
      <DialogContentText dangerouslySetInnerHTML={{ __html: error || 'Error' }} />
    </BaseDialog>
  );
}
