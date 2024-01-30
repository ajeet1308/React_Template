import Grid from '@mui/material/Grid';
import { Label } from '../../../formFields';
import { CustomFormControl } from '../../../styledComponents/formGenerator';

const LabelGrid = ({
  alignment, input, register, errors, variant, setValue, getValues
}) => {
  const {
    xs, sm, md, lg, xl
  } = alignment;
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <CustomFormControl variant={variant}>
        <Label
          register={register}
          errors={errors}
          input={input}
          variant={variant}
          setValue={setValue}
          getValues={getValues}
        />
      </CustomFormControl>
    </Grid>
  );
};

export default LabelGrid;
