import { useEffect, useState } from 'react';
import { FormGroup, FormLabel, TextField, Typography } from '@mui/material';
import CustomDialog, { CustomDialogProps } from '@/components/CustomDialog';

interface UpdateUserDialogProps extends CustomDialogProps {
  userEditData: UserListItem | undefined;
  onUpdateUser: (newName: string) => void;
}

export default function UpdateUserDialog({ userEditData, onClose, onUpdateUser, ...rest }: UpdateUserDialogProps) {
  const [newName, setNewName] = useState<string>(userEditData?.name || '');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setNewName(userEditData?.name || '');
  }, [userEditData]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setNewName(e.target.value);
  };

  const validateName = () => {
    const nameRegex = /^[A-Za-z가-힣]{1,16}$/;
    let errorMsg = '';
    if (!newName) {
      errorMsg = '이름을 입력하세요.';
    } else if (!nameRegex.test(newName)) {
      errorMsg = '이름을 올바르게 입력하세요.(숫자, 특수문자, 공백 입력 불가)';
    }
    setError(errorMsg);
    return errorMsg === '';
  };

  const handleConfirm = async () => {
    const isValid = validateName();
    if (!isValid) return;
    await onUpdateUser(newName);
    resetFormData();
  };

  const resetFormData = () => {
    setNewName(userEditData?.name || '');
    setError('');
  };

  return (
    <CustomDialog title="사용자 수정" closeOnConfirm={false} onConfirm={handleConfirm} onClose={onClose} {...rest}>
      <FormGroup>
        <FormLabel required sx={{ display: 'block', mb: 0.5 }}>
          아이디
        </FormLabel>
        <Typography>{userEditData?.email}</Typography>
      </FormGroup>
      <FormGroup sx={{ mt: 2 }}>
        <FormLabel required sx={{ display: 'block', mb: 0.5 }}>
          이름
        </FormLabel>
        <TextField
          required
          id="name"
          name="name"
          type="text"
          fullWidth
          variant="outlined"
          value={newName}
          error={!!error}
          helperText={error}
          onChange={handleNameChange}
        />
      </FormGroup>
    </CustomDialog>
  );
}
