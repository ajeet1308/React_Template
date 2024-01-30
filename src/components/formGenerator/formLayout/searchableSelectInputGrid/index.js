import Grid from '@mui/material/Grid';
import { SearchableSelectInput } from '../../../formFields';
import { CustomFormControl } from '../../../styledComponents/formGenerator';

const SearchableSelectInputGrid = ({
  alignment, input, register, errors, defaultValue, variant
}) => {
  const {
    xs, sm, md, lg, xl
  } = alignment;
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <CustomFormControl variant={variant}>
        <SearchableSelectInput
          register={register}
          errors={errors}
          input={input}
          defaultValue={defaultValue}
          variant={variant}
        />
      </CustomFormControl>
    </Grid>
  );
};

export default SearchableSelectInputGrid;
