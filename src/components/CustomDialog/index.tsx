import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface CustomDialogProps extends DialogProps {
  title?: string & React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  renderActions?: () => React.ReactNode;
}

export default function CustomDialog(props: CustomDialogProps) {
  const {
    title,
    onClose,
    onConfirm,
    onCancel,
    children,
    cancelText = '취소',
    confirmText = '확인',
    renderActions,
    ...rest
  } = props;

  const handleClose = () => {
    onCancel?.();
  };
  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    onConfirm?.();
    onClose?.(e, 'backdropClick');
  };

  return (
    <Dialog
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
            {onCancel && (
              <Button onClick={handleClose} variant="outlined">
                {cancelText}
              </Button>
            )}
            {onConfirm && (
              <Button onClick={handleConfirm} variant="contained" type="submit">
                {confirmText}
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
