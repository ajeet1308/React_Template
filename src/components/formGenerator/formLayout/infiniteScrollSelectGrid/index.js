import Grid from '@mui/material/Grid';

import { CustomFormControl } from '../../../styledComponents/formGenerator';
import InfiniteScrollSelect from '../../../formFields/infiniteScrollSelect';

const InfiniteScrollSelectGrid = ({
  alignment, input, register, errors, defaultValue, variant, setValue
}) => {
  const {
    xs, sm, md, lg, xl
  } = alignment;
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <CustomFormControl variant={variant}>
        <InfiniteScrollSelect
          register={register}
          errors={errors}
          input={input}
          defaultValue={defaultValue}
          variant={variant}
          setValue={setValue}
        />
      </CustomFormControl>
    </Grid>
  );
};

export default InfiniteScrollSelectGrid;
