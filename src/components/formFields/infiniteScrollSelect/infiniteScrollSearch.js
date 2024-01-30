/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

const defaultAdditional = {
  page: 1
};

const InfiniteScrollSelect = (props) => {
  const {
    loadOptions, value, onChange, ref, ...restProps
  } = props;
  //   console.log(onChange);
  const loadPageOptions = async (
    q,
    prevOptions,
    { page }
  ) => {
    const { options, hasMore } = await loadOptions(q, prevOptions, page);

    return {
      options,
      hasMore,
      additional: {
        page: page + 1
      }
    };
  };
  return (
    <AsyncPaginate
      value={value}
      loadOptions={loadPageOptions}
      onChange={onChange}
      additional={defaultAdditional}
      isSearchable
      isClearable
      {...ref}
      // loadMore={handleLoadMore}
      {...restProps}
    />
  );
};

export default InfiniteScrollSelect;
