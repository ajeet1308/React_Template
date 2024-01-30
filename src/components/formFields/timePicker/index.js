import React, { useState, useEffect } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled } from '@mui/material/styles';
import ErrorText from '../errorHandler';
import { TextFieldStyled } from '../../styledComponents';

const TimePickerStyled = styled(TimePicker)(({ theme }) => ({
  // backgroundColor: theme?.timepicker?.primary,
}));
const TimePickerComponent = (props) => {
  const {
    register, errors, input, variant, setValue, getValues, defaultValue
  } = props;
  const [time, setTime] = useState(null);
  const value = getValues(input?.name);

  useEffect(() => {
    register(input?.name, { required: input?.validation?.isRequired });
  }, [register]);
  useEffect(() => {
    setTime(value || defaultValue);
  }, [value]);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePickerStyled
          id='timeIcon'
          label={input?.label}
          ampmInClock={false}
          ampm={false}
          value={time}
          defaultValue={time}
          disabled={input?.disabled ?? false}
          onChange={(v) => {
            console.log(v);
            setValue(input?.name, v, { shouldValidate: true, shouldDirty: true });
            // setTime(v);
          }}
          renderInput={(params) => (
            <TextFieldStyled
              {...params}
              variant={variant}
            />
          )}
        />
      </LocalizationProvider>
      <ErrorText input={input} errors={errors} />
    </>
  );
};
export default TimePickerComponent;
