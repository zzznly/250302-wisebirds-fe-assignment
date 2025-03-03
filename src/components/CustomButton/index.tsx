import { Button } from '@mui/material';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  href?: string;
  variant?: 'contained' | 'outlined' | 'text';
}

export default function CustomButton({ color = 'white', children, ...props }: ButtonProps) {
  return (
    <Button {...props} sx={{ p: 0, color, textTransform: 'none', height: '40px' }}>
      {children}
    </Button>
  );
}
