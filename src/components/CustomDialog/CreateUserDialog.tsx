import { useState } from 'react';
import { FormGroup, FormLabel, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomDialog, { CustomDialogProps } from '@/components/CustomDialog';
import CustomButton from '@/components/CustomButton';
import UserService from '@/service/user/UserService';

interface CreateUserDialogProps extends CustomDialogProps {
  onCreateUser: (data: FormData) => void;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function CreateUserDialog({ onClose, onCreateUser, onConfirm, ...rest }: CreateUserDialogProps) {
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

  const [showPassword, setShowPassword] = useState({ password: false, repeat_password: false });
  const handleToggleShowPassword = (field: keyof typeof showPassword) => () => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
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

  const checkUserEmailExist = async (email: string) => {
    try {
      const response = await UserService.checkUserEmail(email);
      return response.data.result;
    } catch (error) {
      console.error('check email exist error: ', error);
    }
  };

  const validateForm = async () => {
    const newErrors = {
      email: '',
      password: '',
      repeat_password: '',
      name: '',
    };

    // 1) 이메일 검사
    // - 길이 9~50
    // - 이메일 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = '아이디(이메일)을 입력하세요.';
    } else if (formData.email.length < 9 || formData.email.length > 50 || !emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 주소를 입력하세요.';
    } else {
      // 이메일 중복 체크
      const isExist = await checkUserEmailExist(formData.email);
      console.log('# exist email check: ', isExist);
      if (isExist) {
        newErrors.email = '이미 사용 중인 이메일입니다. 다른 이메일로 변경하세요.';
      }
    }

    // 2) 비밀번호 검사
    // - 8~15자
    // - 영문/숫자/특수문자 포함
    // - 공백 불가
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,15}$/;

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력하세요.';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = '8~15자 영문, 숫자, 특수문자를 사용하세요.';
    }

    // 3) 비밀번호 확인
    if (!formData.repeat_password) {
      newErrors.repeat_password = '비밀번호를 입력하세요.';
    } else if (formData.repeat_password !== formData.password) {
      newErrors.repeat_password = '비밀번호가 일치하지 않습니다.';
    }

    // 4) 이름 검사
    // - 1~16자
    // - 영문/한글만 허용 (공백/숫자/특수문자 불가)
    const nameRegex = /^[A-Za-z가-힣]{1,16}$/;
    if (!formData.name) {
      newErrors.name = '이름을 입력하세요.';
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = '이름을 올바르게 입력하세요.(숫자, 특수문자, 공백 입력 불가)';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(msg => msg === '');
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    await onCreateUser(data);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({ email: '', password: '', repeat_password: '', name: '' });
    setErrors({ email: '', password: '', repeat_password: '', name: '' });
  };

  return (
    <CustomDialog title="사용자 생성" closeOnConfirm={false} onConfirm={handleSubmit} onClose={onClose} {...rest}>
      {/* 아이디(이메일) */}
      <FormGroup sx={{ mt: 1 }}>
        <FormLabel required sx={{ display: 'block', mb: 0.5 }}>
          아이디(이메일)
        </FormLabel>
        <TextField
          required
          placeholder="아이디(이메일)을 입력하세요."
          type="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleFormChange('email')}
          error={!!errors.email}
          helperText={errors.email}
        />
      </FormGroup>

      {/* 비밀번호 */}
      <FormGroup sx={{ mt: 1 }}>
        <FormLabel required sx={{ display: 'block', mb: 0.5 }}>
          비밀번호
        </FormLabel>
        <TextField
          required
          placeholder="비밀번호를 입력하세요. (영문, 숫자, 특수문자 중 8~15자)"
          type={showPassword.password ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={formData.password}
          onChange={handleFormChange('password')}
          error={!!errors.password}
          helperText={errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleShowPassword('password')} edge="end">
                    {showPassword.password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FormGroup>

      {/* 비밀번호 확인 */}
      <FormGroup sx={{ mt: 1 }}>
        <FormLabel required sx={{ display: 'block', mb: 0.5 }}>
          비밀번호 확인
        </FormLabel>
        <TextField
          required
          placeholder="비밀번호를 다시 입력하세요."
          type={showPassword.repeat_password ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={formData.repeat_password}
          onChange={handleFormChange('repeat_password')}
          error={!!errors.repeat_password}
          helperText={errors.repeat_password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleShowPassword('repeat_password')} edge="end">
                    {showPassword.repeat_password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FormGroup>

      {/* 이름 */}
      <FormGroup sx={{ mt: 1 }}>
        <FormLabel required sx={{ display: 'block', mb: 0.5 }}>
          이름
        </FormLabel>
        <TextField
          required
          placeholder="이름을 입력하세요."
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleFormChange('name')}
          error={!!errors.name}
          helperText={errors.name}
        />
      </FormGroup>
    </CustomDialog>
  );
}
