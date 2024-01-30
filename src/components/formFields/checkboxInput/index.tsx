/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import { FormControlLabel } from '@mui/material';
import {
  FieldError, RegisterOptions, UseControllerProps, UseFormRegisterReturn
} from 'react-hook-form';
import styled from '@emotion/styled';
import { Options, Validation } from '../../../interfaces';
import ErrorText from '../errorHandler';
import { CheckboxPrimary, CheckboxLabelPrimary } from '../../styledComponents';

interface CheckboxInputData {
  label: string;
  name: string;
  validation: Partial<Validation>;
  option: Options[] | any;
}
interface CheckboxInputProps extends UseControllerProps {
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  errors: FieldError | undefined;
  input: CheckboxInputData;
  defaultValue: string[];
}

const WrapperDiv = styled.div`
  display: flex;
  margin-top: 20px;
`;

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  register,
  errors,
  input,
  defaultValue
}) => {
  const defaultValueHandler = (defaultVal: string[], option: string | Options) => {
    if (defaultVal === undefined) return false;
    if (typeof defaultVal === 'object') {
      return defaultVal.find(
        (element) => element === option
      ) !== undefined;
    }
    return option === defaultVal;
  };

  return (
    <WrapperDiv>
      <CheckboxLabelPrimary>{input?.label}</CheckboxLabelPrimary>
      <FormGroup defaultValue={defaultValue}>
        {input?.option?.map((option: string) => (
          <FormControlLabel
            key={input.name + option}
            {...register(input?.name, { required: input?.validation?.isRequired })}
            value={option}
            control={(
              <CheckboxPrimary
                defaultChecked={defaultValueHandler(defaultValue, option)}
              />
            )}
            label={option}
          />
        ))}
      </FormGroup>
      <ErrorText key={input.name + input.label} input={input} errors={errors} />
    </WrapperDiv>
  );
};

export default CheckboxInput;
