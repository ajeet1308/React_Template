import Grid from '@mui/material/Grid';
import { RadioInput } from '../../../formFields';
import { CustomFormControl } from '../../../styledComponents/formGenerator';

const RadioInputGrid = ({
  alignment, input, register, errors, defaultValue, variant
}) => {
  const {
    xs, sm, md, lg, xl
  } = alignment;
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <CustomFormControl variant={variant}>
        <RadioInput
          register={register}
          errors={errors}
          input={input}
          defaultValue={defaultValue}
          variant={variant}
          row={input?.row}
        />
      </CustomFormControl>
    </Grid>
  );
};

export default RadioInputGrid;
