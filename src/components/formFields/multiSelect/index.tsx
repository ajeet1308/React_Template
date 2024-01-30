import React, { Key, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import {
  DeepMap, FieldError, FieldValues,
  RegisterOptions,
  UseControllerProps,
  UseFormRegisterReturn, UseFormReturn
} from 'react-hook-form';
import { TextFieldVariants } from '@mui/material/TextField';
import { Box, SelectChangeEvent } from '@mui/material';
import ErrorText from '../errorHandler';
import {
  SelectLabelStyled,
  SelectMenuStyle,
  SelectStyled
} from '../../styledComponents';
import { Options, Validation } from '../../../interfaces';

interface MultiSelectData {
  label: string;
  id: string;
  name: string;
  validation: Partial<Validation>
  option: Options[];
  isChipEnable: boolean;
}
interface MultiSelectProps<T extends FieldValues> extends UseControllerProps {
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  errors: DeepMap<T, FieldError>;
  input: MultiSelectData;
  setValue: UseFormReturn['setValue'];
  defaultValue: string | string[];
  variant : TextFieldVariants | undefined
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const MultiSelect = <T extends FieldValues>(props: MultiSelectProps<T>) => {
  const {
    register, errors, input, setValue, defaultValue, variant
  } = props;
  let setDefault : string | string[] = [];
  if (defaultValue !== undefined && defaultValue !== '') setDefault = defaultValue;
  const [personName, setPersonName] = useState<string[]>(typeof (setDefault) === 'string' ? setDefault?.split(',') : setDefault);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    setPersonName(value as string[]);
    setValue(input.name, value, { shouldValidate: true });
  };
  const handleDelete = (value : string, index : number) => {
    const copyOfPersonName = [...personName];
    copyOfPersonName.splice(index, 1);
    setPersonName(copyOfPersonName);
  };
  return (
    <>
      <SelectLabelStyled variant={variant}>{input.label}</SelectLabelStyled>
      <SelectStyled
        id={`${input.id}-basic`}
        label={input.label}
        variant={variant}
        multiple
        {...register(input.name, { required: input?.validation?.isRequired })}
        value={personName}
        onChange={handleChange}
        MenuProps={MenuProps}
        renderValue={(selected) => (selected as string[])?.join(',')}
      >
        {input?.option?.map((item : any) => (
          <SelectMenuStyle
            className='option'
            style={{ display: 'flex', justifyContent: 'space-between', }}
            key={input.label}
            value={(typeof item === 'object'
              && !Array.isArray(item)) ? item.value : item}
          >
            {(typeof item === 'object'
              && !Array.isArray(item)) ? item.label : item}
            {personName.indexOf(`${typeof item === 'object'
              && !Array.isArray(item) ? item.value : item}`) !== -1 && <DoneIcon /> }
          </SelectMenuStyle>

        ))}
      </SelectStyled>
      { input?.isChipEnable
        && (
        <Box>
          {
          personName?.map((item, index) => (
            <Chip
              style={{ margin: '5px' }}
              label={item}
              onDelete={() => handleDelete(item, index)}
            />
          ))
        }
        </Box>
        )}
      <ErrorText input={input} errors={errors} />
    </>
  );
};

export default MultiSelect;
