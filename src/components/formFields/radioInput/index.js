import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import styled from '@emotion/styled';
import ErrorText from '../errorHandler';
import { RadioLabelStyled, RadiobuttonStyle } from '../../styledComponents';

const WrapperDiv = styled.div`
margin-top: 25px;
`;

const RadioInput = (props) => {
  const {
    register, errors, input, defaultValue, row, sx,
  } = props;
  return (
    <WrapperDiv>
      <RadioLabelStyled>{input.label}</RadioLabelStyled>
      <RadioGroup defaultValue={defaultValue} row={input?.inline ? input.inline : false}>
        {input.option.map((option) => (
          <FormControlLabel
            key={input.name + option}
            {...register(input.name, { required: input?.validation?.isRequired })}
            value={option}
            control={<RadiobuttonStyle />}
            label={option}
            sx={sx}
            disabled={input?.disabled || false}
          />
        ))}
      </RadioGroup>
      <ErrorText errors={errors} input={input} />
    </WrapperDiv>
  );
};
export default RadioInput;
