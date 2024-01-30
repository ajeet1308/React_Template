/* eslint-disable max-len */
/* eslint-disable no-undef */
import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import InfiniteScrollSelect from './infiniteScrollSearch';
import ErrorText from '../errorHandler';

const infiniteScrollSearch = (props) => {
  const {
    register, errors, input, variant, setValue
  } = props;
  const [selectedOption, setSelectedOption] = useState(null);

  // // Custom debounce function
  // const customDebounce = (func, delay) => {
  //   let timeoutId;

  //   return function (...args) {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }

  //     timeoutId = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // };

  // // Create a debounced version of the loadOptions function using the custom debounce
  // const debouncedLoadOptions = customDebounce(async (search, prevOptions, page) => {
  //   // const response = await input?.fetchOptions(search, page, 10);
  //   const response = [{ value: 1, lable: 'one' }];
  //   console.log('resp', response, prevOptions, search, page);
  //   setSelectedOption(search);
  //   return {
  //     options: response,
  //     hasMore: response.length >= 10,
  //   };
  // }, 350); // Adjust the debounce delay as needed

  // const loadOptions = (search, prevOptions, page) => {
  //   debouncedLoadOptions(search, prevOptions, page);
  // };
  const loadOptions = async (search, prevOptions, page) => {
    try {
      const response = await input?.fetchOptions(search, page, 10);
      // const response = [{ value: 1, lable: 'one' }];
      // console.log('resp', response, prevOptions, search, page);
      setSelectedOption(search);
      return {
        options: response,
        hasMore: response.length >= 10,
      };
    } catch (err) {
      console.log('some error occured', err);
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  return (
    <>
      <InfiniteScrollSelect
        value={selectedOption}
        onChange={(opt) => { setSelectedOption(opt); setValue(input?.name, opt); }}
        loadOptions={loadOptions}
        ref={register(
          input?.name,
          { required: input?.validation?.isRequired, pattern: input?.validation?.pattern }
        )}
        variant={variant}
        id={`${input?.id}-basic`}
        isMulti={input?.isMultiSelect}
        label={input?.label}
        isDisabled={input?.disabled}
        placeholder={input?.textFieldPlaceholder}
        defaultInputValue={input?.defaultInputValue}
      />
      <ErrorText input={input} errors={errors} />

    </>
  );
};

export default infiniteScrollSearch;
