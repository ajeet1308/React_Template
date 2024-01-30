import React from 'react';
import { ButtonPrimary } from '../../styledComponents';

interface ButtonInputProps {
  input: {
    name: string;
    label: string;
    type: any;
    onClick: any;
  },
  setValue: any,
  getValues: any,
}
const ButtonInput: React.FC<ButtonInputProps> = ({ input, setValue, getValues }) => {
  const handleClick = () => {
    const val = getValues(input?.name);
    setValue(input?.name, val !== undefined ? val + 1 : 1);
    input?.onClick();
  };
  return <ButtonPrimary type={input?.type ?? 'button'} onClick={handleClick} variant='contained'>{input?.label}</ButtonPrimary>;
};

export default ButtonInput;
