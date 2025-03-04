import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CustomButton from '../CustomButton';

export interface CustomDialogProps extends DialogProps {
  title?: string & React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  renderActions?: () => React.ReactNode;
  closeOnConfirm?: boolean;
}

export default function CustomDialog(props: CustomDialogProps) {
  const {
    open,
    title,
    onClose,
    onConfirm,
    closeOnConfirm = true,
    cancelText = '취소',
    confirmText = '확인',
    children,
    renderActions,
    ...rest
  } = props;

  const handleConfirm = () => {
    if (closeOnConfirm) {
      onClose?.();
    }
    onConfirm?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        width: '100%',
      }}
      slotProps={{
        paper: {
          sx: {
            minWidth: '400px',
            width: '100%',
          },
        },
      }}
      {...rest}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {renderActions ? (
          renderActions()
        ) : (
          <>
            <CustomButton onClick={handleClose} variant="outlined">
              {cancelText}
            </CustomButton>
            <CustomButton onClick={handleConfirm} variant="contained" type="submit">
              {confirmText}
            </CustomButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
