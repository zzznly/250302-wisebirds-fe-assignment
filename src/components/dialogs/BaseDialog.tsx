import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CustomButton from '../CustomButton';

export interface BaseDialogProps extends DialogProps {
  title?: string & React.ReactNode;
  closeText?: string;
  confirmText?: string;
  onClose: () => void;
  onConfirm?: () => void;
  renderActions?: () => React.ReactNode;
  closeOnConfirm?: boolean;
}

const BaseDialog = (props: BaseDialogProps) => {
  const {
    title,
    open,
    onClose,
    onConfirm,
    closeOnConfirm = true,
    closeText = '취소',
    confirmText = '확인',
    children,
    renderActions,
    ...rest
  } = props;

  const handleConfirm = () => {
    if (closeOnConfirm) {
      onClose();
    }
    onConfirm?.();
  };

  const renderDefaultActions = () => (
    <>
      {closeOnConfirm ? (
        <CustomButton onClick={handleConfirm} variant="contained" type="submit">
          {confirmText}
        </CustomButton>
      ) : (
        <>
          <CustomButton onClick={onClose} variant="outlined">
            {closeText}
          </CustomButton>
          <CustomButton onClick={handleConfirm} variant="contained" type="submit">
            {confirmText}
          </CustomButton>
        </>
      )}
    </>
  );

  return (
    <Dialog
      {...rest}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            minWidth: '400px',
            width: '100%',
          },
        },
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>{renderActions ? renderActions() : renderDefaultActions()}</DialogActions>
    </Dialog>
  );
};

export default BaseDialog;
