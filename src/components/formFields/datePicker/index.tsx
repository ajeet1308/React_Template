import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  FieldError, RegisterOptions, UseControllerProps,
  UseFormRegisterReturn, UseFormReturn
} from 'react-hook-form';
import { TextFieldVariants } from '@mui/material/TextField';
import ErrorText from '../errorHandler';
import { TextFieldStyled } from '../../styledComponents';
import { Validation } from '../../../interfaces';

interface DatePickerInputData{
  name: string;
  defaultValue: string;
  validation: Partial<Validation>;
  isFutureDateDisable: boolean;
  isPastDateDisable: boolean;
  disabled: boolean;
  }
interface DatePickerProps extends UseControllerProps {
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  errors: FieldError | undefined;
  input: Partial<DatePickerInputData> | any;
  setValue: UseFormReturn['setValue'];
  variant: TextFieldVariants | undefined;
  getValues: UseFormReturn['getValues'];
}
const DatePickerComponent : React.FC<DatePickerProps> = (props) => {
  const [date, setDate] = useState<string | null>(null);
  const {
    register, errors, input, setValue, variant, getValues
  } = props;
  let value = '';
  if (input?.defaultValue !== undefined) {
    value = getValues(input.name) || dayjs(input?.defaultValue).format('YYYY-MM-DD');
  } else {
    value = getValues(input?.name) || input?.defaultValue;
  }

  const disableCustomDates : (day: Date) => boolean = (currentDate) => {
    if (input?.greaterDateDisable && input?.lesserDateDisable) {
      const lesserDate = new Date(input?.lesserDateDisable);
      const greaterDate = new Date(input?.greaterDateDisable);
      return currentDate < lesserDate || currentDate > greaterDate;
    }

    if (input?.greaterDateDisable) {
      const greaterDate = new Date(input?.greaterDateDisable);
      return currentDate > greaterDate;
    }

    if (input?.lesserDateDisable) {
      const lesserDate = new Date(input?.lesserDateDisable);
      return currentDate < lesserDate;
    }
    return false;
  };

  useEffect(() => {
    register(input?.name, { required: input?.validation?.isRequired });
    setDate(value || input?.defaultValue);
    setValue(
      input?.name,
      value,
      { shouldValidate: true }
    );
  }, [value]);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          className='date-picker'
          disableHighlightToday={false}
          disabled={input?.disabled}
          label={input?.validation?.isRequired ? `${input?.label}*` : input?.label}
          inputFormat='yyyy-MM-dd'
          value={date}
          onChange={(v) => setValue(
            input?.name,
            dayjs(v).format('YYYY-MM-DD'),
            { shouldValidate: true }
          )}
          renderInput={(params) => (
            <TextFieldStyled
              onKeyDown={(e) => {
                if (input?.readonly) {
                  e.preventDefault();
                }
              }}
              variant={variant}
              {...params}
              disabled={input?.disabled}
            />
          )}
          disableFuture={input?.isFutureDateDisable}
          disablePast={input?.isPastDateDisable}
          shouldDisableDate={disableCustomDates}
        />
      </LocalizationProvider>
      <ErrorText input={input} errors={errors} />
    </>
  );
};

export default DatePickerComponent;
