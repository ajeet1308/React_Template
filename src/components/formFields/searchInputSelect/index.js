/* eslint-disable no-undef */
import Autocomplete from '@mui/material/Autocomplete';
import ErrorText from '../errorHandler';
import { TextFieldStyled } from '../../styledComponents';

const SearchInputSelect = (props) => {
  const {
    register, errors, input, variant, setValue, getValues
  } = props;
  // console.log(input, getValues(input?.name));
  return (
    <>
      <Autocomplete
        id='search-filled'
        disablePortal
        disabled={input?.disabled}
        value={!['', null, {}, undefined].includes(getValues(input?.name))
          ? getValues(input?.name) : input?.defaultValue}
        multiple={input?.isMultiSelect ?? false}
        disableCloseOnSelect={input?.openMenuOnMultiSelect ?? false}
        options={input?.option}
        renderInput={(params) => (
          <TextFieldStyled
            {...params}
            variant={variant}
            id={`${input?.id}-basic`}
            label={input?.label}
            placeholder={input?.textFieldPlaceholder}
          />
        )}
        {...register(
          input?.name,
          { required: input?.validation?.isRequired, pattern: input?.validation?.pattern }
        )}
        onChange={(event, value) => {
          setValue(input?.name, value);
          if (input?.callback)input?.callback(value);
        }}
      />

      <ErrorText input={input} errors={errors} />
    </>
  );
};
export default SearchInputSelect;
