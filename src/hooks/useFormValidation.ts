import { validateEmail, validateName, validatePassword, validateRepeatPassword } from '@/utils/validation';
import { useState } from 'react';

const DEFAULT_FORM_DATA = {
  email: '',
  password: '',
  repeat_password: '',
  name: '',
};
export default function useFormValidation() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState(DEFAULT_FORM_DATA);

  const checkValidateForm = async () => {
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

  const resetFormData = () => {
    setFormData({ email: '', password: '', repeat_password: '', name: '' });
    setErrors({ email: '', password: '', repeat_password: '', name: '' });
  };

  return { formData, setFormData, errors, setErrors, checkValidateForm, resetFormData, handleFormChange };
}
