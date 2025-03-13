import { OptionHTMLAttributes } from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import Option, { MenuItemProps } from '@mui/material/MenuItem';

type CustomSelectProps = SelectProps & {
  children?: React.ReactNode;
};

export default function CustomSelect({ children, sx, ...rest }: CustomSelectProps) {
  return (
    <Select sx={{ backgroundColor: 'white', minWidth: 120, ...sx }} {...rest}>
      {children}
    </Select>
  );
}
CustomSelect.Option = CustomSelectOption;

type OptionProps = MenuItemProps & OptionHTMLAttributes<HTMLOptionElement>;
function CustomSelectOption({ value, children, ...rest }: OptionProps) {
  return (
    <Option value={value} {...rest}>
      {children}
    </Option>
  );
}