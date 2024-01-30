/* eslint-disable max-len */
import {
  DeepMap, FieldError, RegisterOptions, UseFormRegisterReturn, UseFormReturn
} from 'react-hook-form';
import { TextFieldVariants } from '@mui/material';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { TextFieldStyled } from '../../styledComponents';
import ErrorText from '../errorHandler';

const _ = require('lodash');

interface TextInputProps {
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  errors: UseFormReturn['formState'];
  input: any;
  setValue: UseFormReturn['setValue'];
  getValues: UseFormReturn['getValues'];
  defaultValue: string | string[];
  variant: TextFieldVariants | undefined
}

const TextInput = (props: TextInputProps) => {
  const {
    register, errors, input, variant, defaultValue, setValue, getValues
  } = props;
  // console.log(input.name, defaultValue, input);
  const [cursor, setCursor] = useState<number | null>(null);
  const ref = useRef<any>(null);

  // Please check these tutorials:
  // https://github.com/mui/material-ui/issues/12779
  // https://stackoverflow.com/questions/46000544/react-controlled-input-cursor-jumps
  useLayoutEffect(() => {
    if (input?.type !== 'number') {
      ref.current?.setSelectionRange(cursor, cursor);
    }
  }, [ref, cursor, defaultValue]);

  const numberFormat = (data: any) => {
    const value = data.toString();
    const amt = value.replace(/[,]/g, '');
    const lastThree = amt.substring(amt.length - 3);
    const otherNumbers = amt.substring(0, amt.length - 3);
    if (otherNumbers.length > 0) {
      return `${otherNumbers.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${lastThree}`;
    }
    // console.log('numberFormat', lastThree);
    return lastThree;
  };
  const toSentenceCase = (inputString: string) => inputString.replace(/\b\w/g, (match: any) => match.toUpperCase());
  const inputValueHandler = (value: any) => {
    if (input.isAmount && value?.length > 3) {
      return numberFormat(value);
    }
    if (input?.isUpperCase) {
      return value.toUpperCase();
    }
    if (input?.isCaseSensitive) {
      return toSentenceCase(value);
    }
    return value;
  };
  const calculateCursorPosition = (
    selectionStart : any,
    selectionEnd : any,
    formattedValue : any,
    rawValue : any
  ) => {
    // console.log(selectionStart, selectionEnd, formattedValue, rawValue);
    const pos = selectionStart + (formattedValue.length - rawValue.length);
    return pos;
  };
  const handleChange = (e: any) => {
    if (!input.isAmount) {
      setCursor(e.target.selectionStart);
    } else {
      const { selectionStart, selectionEnd } = e.target;
      const currentpos = calculateCursorPosition(selectionStart, selectionEnd, inputValueHandler(e.target.value), e.target.value);
      console.log(currentpos);
      setCursor(currentpos);
    }
    setValue(input?.name, inputValueHandler(e.target.value), {
      shouldValidate: true
    });
    input?.attributes?.onChange(e);
  };
  const debouncedOnChange = debounce(handleChange, 100);
  const tempAttributes = { ...input?.attributes };

  let restAttributes;
  if (input?.attributes && Object.keys(tempAttributes).length > 0 && 'onChange' in tempAttributes) {
    delete tempAttributes.onChange;
    restAttributes = tempAttributes;
  } else {
    restAttributes = input?.attributes;
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <TextFieldStyled
          style={!input?.customStyle ? { display: input?.display && 'none' } : { ...input?.customStyle }}
          title={defaultValue || input?.label}
          id={`${input?.id}-basic`}
          label={input?.label}
          variant={variant}
        // value={(input.isAmount && defaultValue?.length > 3)
        //   ? numberFormat(defaultValue)
        //   : defaultValue}
          defaultValue={defaultValue || ''}
          maxRows={input?.maxRows}
          rows={input?.rows}
          multiline={input?.multiline}
          disabled={input?.disabled}
          readOnly={input?.readOnly}
          type={input?.type}
          isErrorFound={_.get(errors, input.name)}
          InputLabelProps={{
            shrink: !!getValues(input?.name) || !!defaultValue || input?.isShrink
          }}
          InputProps={{
            readOnly: input?.readOnly,
            ...input?.InputProps
          }}
          {...register(
            input?.name,
            {
              required: input?.validation?.isRequired,
              min: (input?.validation?.min)
                ? input?.validation?.min : undefined,
              max: (input?.validation?.max)
                ? input?.validation?.max : undefined,
              maxLength: input?.validation?.maxLength,
              minLength: input?.validation?.minLength,
              pattern: (input?.validation?.pattern)
                ? new RegExp(input?.validation?.pattern) : undefined,
              onChange: (e) => handleChange(e)
            },
          )
        }
          inputRef={ref}
          {...restAttributes}
        />
        {
        input?.overlayIcon?.Icon
        }
      </div>
      <ErrorText input={input} errors={errors} />
    </>
  );
};

export default TextInput;
