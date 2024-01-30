import FormHelperText from '@mui/material/FormHelperText';

const _ = require('lodash');

const renderError = (input, errors, key) => {
  switch (_.get(errors, input.name)?.type) {
    case 'required':
      return <FormHelperText sx={{ marginLeft: '2px' }} key={key} error>{input.validation.requiredMsg}</FormHelperText>;
    case 'custom':
      return <FormHelperText sx={{ marginLeft: '2px' }} key={key} error>{errors[input.name]?.customMsg}</FormHelperText>;
    case 'pattern':
      return <FormHelperText sx={{ marginLeft: '2px' }} key={key} error>{input.validation.patternMsg}</FormHelperText>;
    case 'min':
      return <FormHelperText sx={{ marginLeft: '2px' }} key={key} error>{input?.validation?.minMsg}</FormHelperText>;
    case 'max':
      return <FormHelperText sx={{ marginLeft: '2px' }} key={key} error>{input?.validation?.maxMsg}</FormHelperText>;
    case 'maxLength':
      return <FormHelperText sx={{ marginLeft: '2px' }} key={key} error>{input?.validation?.maxLengthMsg}</FormHelperText>;
    default:
      return (
        <FormHelperText sx={{ marginLeft: '2px' }} error>{_.get(errors, input.name)?.message}</FormHelperText>
      );
  }
};

const ErrorText = (props) => {
  const { input, errors, key } = props;
  return (
    renderError(input, errors, key)
  );
};

export default ErrorText;
