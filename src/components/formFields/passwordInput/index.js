import { useState } from 'react';
import styled from '@emotion/styled';
import ErrorText from '../errorHandler';
import { INPUT } from './Input';
import {
  PasswordFormControl,
  PasswordLabelStyled
} from '../../styledComponents';

const CustomDiv = styled('div')`
  margin-left: 14px;
  margin-right: 14px;
`;

const PasswordInput = (props) => {
  const {
    register,
    errors,
    input,
    variant,
  } = props;
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const PasswordField = INPUT[variant ?? 'standard'];

  return (
    <>
      <PasswordFormControl variant={variant}>
        <PasswordLabelStyled htmlFor={`${variant}-adornment-password`}>{input?.label}</PasswordLabelStyled>
        <PasswordField
          input={input}
          aria-labelledby={input.label}
          values={values}
          register={register}
          value={input.defaultValue}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
        />
      </PasswordFormControl>
      <CustomDiv>
        <ErrorText input={input} errors={errors} />
      </CustomDiv>
    </>
  );
};

export default PasswordInput;
