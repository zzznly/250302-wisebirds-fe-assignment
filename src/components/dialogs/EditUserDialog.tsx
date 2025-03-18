import { useEffect } from 'react';
import { FormGroup, FormLabel, Typography } from '@mui/material';
import CustomFormInput from '../CustomFormInput';
import BaseDialog, { BaseDialogProps } from './BaseDialog';
import { validateName } from '@/utils/validation';
import useFormValidation from '@/hooks/useFormValidation';

interface EditUserDialogProps extends BaseDialogProps {
  userEditData: UserListItem | undefined;
  onUpdateUser: (newName: string) => void;
}

export default function EditUserDialog({ userEditData, onClose, onUpdateUser, ...rest }: EditUserDialogProps) {
  const { formData, setFormData, errors, setErrors } = useFormValidation();

  useEffect(() => {
    setFormData({ ...formData, name: userEditData?.name || '' });
  }, [userEditData]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, name: '' });
    setFormData({ ...formData, name: e.target.value });
  };

  const handleConfirm = async () => {
    const validateNameError = validateName(formData.name);
    if (validateNameError) {
      setErrors({ ...errors, name: validateNameError });
      return;
    }
    await onUpdateUser(formData.name);
    resetFormInputData();
  };

  const resetFormInputData = () => {
    setFormData({ ...formData, name: userEditData?.name || '' });
    setErrors({ ...errors, name: '' });
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
        value={formData.name}
        onChange={handleNameChange}
        error={!!errors.name}
        helperText={errors.name}
        required
      />
    </BaseDialog>
  );
}
