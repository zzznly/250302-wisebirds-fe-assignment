import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function CustomButton({ children, ...props }: CustomButtonProps) {
  return (
    <Button {...props} sx={{ p: 0, textTransform: 'none', height: '40px' }}>
      {children}
    </Button>
  );
}