import Grid from '@mui/material/Grid';
import { TextInput } from '../../../formFields';
import { CustomFormControl } from '../../../styledComponents/formGenerator';

const TextInputGrid = ({
  alignment, input, register, errors, setErrors, defaultValue, variant, setValue, getValues
}) => {
  const {
    xs, sm, md, lg, xl
  } = alignment;
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <CustomFormControl variant={variant}>
        <TextInput
          register={register}
          errors={errors}
          setErrors={setErrors}
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

export default TextInputGrid;
