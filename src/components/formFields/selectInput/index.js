import { useId } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import ErrorText from '../errorHandler';
import {
  SelectLabelStyled,
  SelectMenuStyle,
  SelectStyled
} from '../../styledComponents';

const SelectInput = (props) => {
  const {
    register, errors, input, defaultValue, setValue, variant, attributes, optionAttributes
  } = props;
  const tempAttributes = { ...attributes };
  const id = useId();
  let restAttributes;
  if (attributes && Object.keys(tempAttributes).length > 0 && 'onChange' in tempAttributes) {
    delete tempAttributes.onChange;
    restAttributes = tempAttributes;
  } else {
    restAttributes = attributes;
  }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {(
        <>
          <SelectLabelStyled
            title={input.label}
            // size='small'
            disabled={input.disabled || (input.disabled && input.option?.length === 1)}
            variant={variant}
          >
            {input.label}

          </SelectLabelStyled>
          <SelectStyled
            id={`${input.id}-basic`}
            // size='small'
            label={input.label}
            title={defaultValue || input.label}
            variant={input.id}
            {...register(
              input.name,
              {
                required: input?.validation?.isRequired,
                onChange: (e) => {
                  setValue(input?.name, e.target.value, { shouldValidate: true });
                  attributes?.onChange(e);
                }
              }
            )}
            disabled={input.disabled || (input.disabled && input.option?.length === 1)}
            {...restAttributes}
        // defaultValue={defaultValue}
            value={defaultValue}
          >
            {input?.option?.map((option) => (
              <SelectMenuStyle
                key={`${typeof option === 'object'
              && !Array.isArray(option) ? option.value : option}-${id}`}
                value={typeof option === 'object'
              && !Array.isArray(option) ? option.value : option}
                {...input?.optionAttributes}
              >
                {
            typeof option === 'object'
              && option?.required && '*'
          }
                {typeof option === 'object'
              && !Array.isArray(option) ? option.label : option}
              </SelectMenuStyle>
            ))}
          </SelectStyled>
          {input?.helperText ? (
            <FormHelperText sx={{ overflowWrap: 'break-word' }}>
              {input.helperText}
            </FormHelperText>
          ) : null}
          <ErrorText input={input} errors={errors} />
        </>
      )}
    </>
  );
};
export default SelectInput;
