import {
  useId, useState, useEffect,
} from 'react';
import ErrorText from '../errorHandler';
import {
  SelectLabelStyled,
  SelectMenuStyle,
  SelectStyled,
} from '../../styledComponents';

const SearchableSelectInput = (props) => {
  const {
    register, errors, input, defaultValue,
  } = props;
  const [userList, setUserList] = useState([]);
  const id = useId();

  useEffect(() => {
    setUserList([]);
  }, [input.role]);

  return (
    <>
      <SelectLabelStyled variant={input.id}>{input.label}</SelectLabelStyled>
      <SelectStyled
        id={`${input.id}-basic`}
        label={input.label}
        variant={input.id}
        {...register(input.name, { required: input?.validation?.isRequired })}
        defaultValue={defaultValue}
      >
        {userList.map((option) => (
          <SelectMenuStyle
            label={option.label}
            key={`${option.label}-${id}`}
            value={option.value}
          >
            {option.label}
          </SelectMenuStyle>
        ))}
      </SelectStyled>
      <ErrorText input={input} errors={errors} />
    </>
  );
};
export default SearchableSelectInput;
