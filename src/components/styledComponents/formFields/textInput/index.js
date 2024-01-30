import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextFieldStyled = styled(TextField)(({
  theme, disabled, readOnly, isErrorFound, spinButtonDisabled = false
}) => ({
  width: '100%',
  '.MuiInputBase-input': {
    cursor: `${disabled || readOnly ? 'default' : ''}`,
    color: isErrorFound ? '#ED1C24 !important' : `${disabled || readOnly ? 'rgba(0, 0, 0, 0.38)' : theme?.input?.primary} !important`,
  },
  '.MuiInputLabel-root': {
    color: isErrorFound ? '#ED1C24 !important' : `${disabled || readOnly ? 'rgba(0, 0, 0, 0.38)' : theme?.input?.primary} !important`
  },
  '.Mui-focused.MuiInputLabel-root': {
    borderColor: `${theme?.input?.primary} !important`
  },
  '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: isErrorFound ? '#ED1C24 !important' : `${theme?.input?.primary} !important`,
    borderWidth: readOnly && '1px !important'
  },
  '.Mui-focused.MuiFilledInput-underline': {
    backgroundColor: theme?.input?.secondary,
  },
  '.Mui-focused .MuiInput-underline': {
    backgroundColor: theme?.input?.secondary,
  },
  '.MuiFilledInput-underline': {
    backgroundColor: theme?.input?.secondary,
    '&:hover': {
      backgroundColor: theme?.input?.secondary,
    },
    '&:focus': {
      backgroundColor: theme?.input?.secondary,
    },
    '&:before': {
      borderColor: `${theme?.input?.primary} !important`
    },
    '&:after': {
      borderColor: `${theme?.input?.primary} !important`,
    }

  },
  '.MuiInput-underline': {
    '&:before': {
      borderColor: `${theme?.input?.primary} !important`
    },
    '&:after': {
      borderColor: `${theme?.input?.primary} !important`,
    }

  },
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: isErrorFound ? '#ED1C24 !important' : `${theme?.input?.primary} !important`,
  },
  '&:hover': {
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: isErrorFound ? '#ED1C24 !important' : `${theme?.input?.primary} !important`,
    },
  },
  svg: {
    color: theme?.input?.primary
  },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    '-webkit-appearance': spinButtonDisabled && 'none',
    margin: spinButtonDisabled && '0px',
  },
}));

export {
  TextFieldStyled
};
