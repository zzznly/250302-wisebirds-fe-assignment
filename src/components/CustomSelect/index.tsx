import { OptionHTMLAttributes } from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import Option, { MenuItemProps } from '@mui/material/MenuItem';

type CustomSelectProps = SelectProps & {
  children?: React.ReactNode;
};
type OptionProps = MenuItemProps & OptionHTMLAttributes<HTMLOptionElement>;

const CustomSelect = ({ children, sx, ...rest }: CustomSelectProps) => (
  <Select sx={{ backgroundColor: 'white', minWidth: 120, ...sx }} {...rest}>
    {children}
  </Select>
);

CustomSelect.Option = ({ value, selected, children, ...rest }: OptionProps) => (
  <Option value={value} selected={selected} {...rest}>
    {children}
  </Option>
);

export default CustomSelect;