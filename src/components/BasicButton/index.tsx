import { Button } from '@mui/material';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  href?: string;
}

export default function BasicButton({ color = 'white', children, ...props }: ButtonProps) {
  return (
    <Button {...props} sx={{ p: 0, color, textTransform: 'none' }}>
      {children}
    </Button>
  );
}
