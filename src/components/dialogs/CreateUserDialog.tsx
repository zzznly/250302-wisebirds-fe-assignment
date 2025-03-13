import { useState } from 'react';
import BaseDialog, { BaseDialogProps } from '@/components/dialogs/BaseDialog';
import CustomFormInput from '../CustomFormInput';
import { validateEmail, validateName, validatePassword, validateRepeatPassword } from '@/utils/validation';

interface CreateUserDialogProps extends BaseDialogProps {
  onCreateUser: (data: FormData) => void;
}

export default function CreateUserDialog({ onCreateUser, onClose, onConfirm, ...rest }: CreateUserDialogProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeat_password: '',
    name: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    repeat_password: '',
    name: '',
  });

  const handleFormChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    setErrors(prev => ({
      ...prev,
      [field]: '',
    }));
  };

  const validateForm = async () => {
    const emailError = await validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const repeatPasswordError = validateRepeatPassword(formData.password, formData.repeat_password);
    const nameError = validateName(formData.name);
    let isValid;

    const newErrors = {
      email: emailError,
      password: passwordError,
      repeat_password: repeatPasswordError,
      name: nameError,
    };
    setErrors(newErrors);

    isValid = Object.values(newErrors).every(errorMsg => errorMsg === '');
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      const isValidForm = await validateForm();
      if (!isValidForm) return;

      const newFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        newFormData.append(key, value);
      });

      await onCreateUser(newFormData);
      resetFormData();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleClose = () => {
    onClose?.();
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({ email: '', password: '', repeat_password: '', name: '' });
    setErrors({ email: '', password: '', repeat_password: '', name: '' });
  };

  return (
    <BaseDialog title="사용자 생성" closeOnConfirm={false} onConfirm={handleSubmit} onClose={handleClose} {...rest}>
      <CustomFormInput
        label="아이디(이메일)"
        name="email"
        placeholder="아이디(이메일)을 입력하세요."
        type="email"
        value={formData.email}
        onChange={handleFormChange('email')}
        error={!!errors.email}
        helperText={errors.email}
        required
      />
      <CustomFormInput
        label="비밀번호"
        name="password"
        placeholder="비밀번호를 입력하세요. (영문, 숫자, 특수문자 중 8~15자)"
        type="password"
        value={formData.password}
        onChange={handleFormChange('password')}
        error={!!errors.password}
        helperText={errors.password}
        required
      />
      <CustomFormInput
        label="비밀번호 확인"
        name="repeat_password"
        placeholder="비밀번호를 다시 입력하세요."
        type="password"
        value={formData.repeat_password}
        onChange={handleFormChange('repeat_password')}
        error={!!errors.repeat_password}
        helperText={errors.repeat_password}
        required
      />
      <CustomFormInput
        label="이름"
        name="name"
        placeholder="이름을 입력하세요."
        type="text"
        value={formData.name}
        onChange={handleFormChange('name')}
        error={!!errors.name}
        helperText={errors.name}
        required
      />
    </BaseDialog>
  );
}
