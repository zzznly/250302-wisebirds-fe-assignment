import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HTMLAttributes, OptionHTMLAttributes, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  sx?: any;
}

export default function SelectBox({ children, sx, ...rest }: SelectProps) {
  return (
    <Select sx={{ backgroundColor: 'white', minWidth: 120, ...sx }} {...rest}>
      {children}
    </Select>
  );
}

interface OptionProps
  extends HTMLAttributes<HTMLLIElement>,
    Pick<OptionHTMLAttributes<HTMLOptionElement>, 'value' | 'selected'> {
  children?: React.ReactNode;
}

function Option(props: OptionProps) {
  return <MenuItem {...props} />;
}
SelectBox.Option = Option;
