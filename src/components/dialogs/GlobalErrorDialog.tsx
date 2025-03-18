import { useAppStore } from '@/stores';
import { DialogContentText } from '@mui/material';
import useDialog from '@/hooks/useDialog';
import BaseDialog from './BaseDialog';

export default function GlobalErrorDialog() {
  const globalErrorMessage = useAppStore(state => state.globalErrorMessage);
  const setGlobalErrorMessage = useAppStore(state => state.setGlobalErrorMessage);
  const { closeDialog } = useDialog();

  const handleClose = () => {
    setGlobalErrorMessage(null);
    closeDialog();
  };

  return (
    <BaseDialog open={!!globalErrorMessage} onConfirm={handleClose} onClose={handleClose}>
      <DialogContentText dangerouslySetInnerHTML={{ __html: globalErrorMessage || '' }} />
    </BaseDialog>
  );
}
