import Grid from '@mui/material/Grid';
import { SearchInputSelect } from '../../../formFields';
import { CustomFormControl } from '../../../styledComponents/formGenerator';

const SearchInputSelectGrid = ({
  alignment, input, register, errors, defaultValue, variant, setValue, getValues
}) => {
  const {
    xs, sm, md, lg, xl
  } = alignment;
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <CustomFormControl variant={variant}>
        <SearchInputSelect
          register={register}
          errors={errors}
          input={input}
          defaultValue={defaultValue}
          variant={variant}
          setValue={setValue}
          getValues={getValues}
        />
      </CustomFormControl>
    </Grid>
  );
};

export default SearchInputSelectGrid;
