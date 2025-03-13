import { useEffect, useState } from 'react';
import { FormGroup, FormLabel, Typography } from '@mui/material';
import CustomFormInput from '../CustomFormInput';
import BaseDialog, { BaseDialogProps } from './BaseDialog';
import { validateName } from '@/utils/validation';

interface UpdateUserDialogProps extends BaseDialogProps {
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

  const handleConfirm = async () => {
    const isValid = validateName(newName) === '';
    if (!isValid) return;
    await onUpdateUser(newName);
    resetFormData();
  };

  const resetFormData = () => {
    setNewName(userEditData?.name || '');
    setError('');
  };

  return (
    <BaseDialog title="사용자 수정" closeOnConfirm={false} onConfirm={handleConfirm} onClose={onClose} {...rest}>
      <FormGroup>
        <FormLabel required sx={{ display: 'block', mb: 0.5 }}>
          아이디
        </FormLabel>
        <Typography>{userEditData?.email}</Typography>
      </FormGroup>
      <CustomFormInput
        label="이름"
        name="name"
        placeholder="이름을 입력하세요."
        type="text"
        value={newName}
        onChange={handleNameChange}
        error={!!error}
        helperText={error}
        required
      />
    </BaseDialog>
  );
}
