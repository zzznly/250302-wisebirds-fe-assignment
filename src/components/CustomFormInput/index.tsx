import { useState } from 'react';
import { TextField, TextFieldProps, FormLabel, InputAdornment, IconButton, FormGroup } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type CustomFormInputProps = TextFieldProps & {
  label: string;
  name: string;
  type?: string;
};

export default function CustomFormInput({ label, name, type = 'text', ...rest }: CustomFormInputProps) {
  const [showPassword, setShowPassword] = useState({ password: false, repeat_password: false });

  const handleToggleShowPassword = (field: keyof typeof showPassword) => () => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const inputType =
    type === 'password' ? (showPassword[type as keyof typeof showPassword] ? 'text' : 'password') : type;

  const slotProps =
    type === 'password'
      ? {
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleShowPassword(type as keyof typeof showPassword)} edge="end">
                  {showPassword[type as keyof typeof showPassword] ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }
      : {};

  return (
    <FormGroup>
      <FormLabel required sx={{ display: 'block', mb: 0.5 }}>
        {label}
      </FormLabel>
      <TextField {...rest} name={name} type={inputType} fullWidth variant="outlined" slotProps={slotProps} />
    </FormGroup>
  );
}
