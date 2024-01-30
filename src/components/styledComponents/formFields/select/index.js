import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { InputLabel, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

const SelectLabelStyled = styled(InputLabel)(({ theme, disabled }) => ({
  // whiteSpace: 'normal',
  color: `${disabled ? 'rgba(0, 0, 0, 0.38)' : theme?.menu?.primary} !important`,
}));

const SelectStyled = styled(Select)(({ theme, isErrorFound }) => ({
  color: `${theme?.menu?.primary} !important`,
  '&:before': {
    borderColor: `${theme?.menu?.primary} !important`,
  },
  '&:after': {
    borderColor: `${theme?.menu?.primary} !important`,
  },
  '.MuiInputBase-input': {
    color: !isErrorFound ? `${theme?.menu?.primary} !important` : 'red !important'
  },
  '.MuiInputLabel-root': {
    color: `${theme?.menu?.primary}`
  },
  '.Mui-focused .MuiInputLabel-root': {
    borderColor: `${theme?.menu?.primary} !important`
  },
  '.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme?.menu?.primary} !important`
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: !isErrorFound ? `${theme?.menu?.primary} !important` : 'red !important'
  },
  '&:hover': {
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: !isErrorFound ? `${theme?.menu?.primary} !important` : 'red !important'
    },
  },
  '&.MuiFilledInput-underline': {
    backgroundColor: `${theme?.input?.secondary} !important`,
    '&:hover': {
      backgroundColor: theme?.input?.secondary,
    },
    '&:before': {
      borderColor: `${theme?.input?.primary} !important`
    },
    '&:after': {
      borderColor: `${theme?.input?.primary} !important`,
    }

  },
  svg: {
    color: theme?.input?.primary
  }

}));

const SelectMenuStyle = styled(MenuItem)(({ theme }) => ({
  color: `${theme?.menu?.primary} !important`,
  '&:after': {
    backgroundColor: `${theme?.menu?.primary} !important`,
  },
  '&:hover': {
    backgroundColor: `${theme?.menu?.secondary} !important`,
    color: `${theme?.input?.ternary} !important`
  },
  '&.Mui-selected': {
    backgroundColor: 'none',
    color: `${theme?.input?.ternary} !important`
  },
  [`&.${menuItemClasses.focusVisible}`]: {
    backgroundColor: `${theme?.menu?.secondary} !important`,
  },
}));

export {
  SelectLabelStyled,
  SelectMenuStyle,
  SelectStyled
};
