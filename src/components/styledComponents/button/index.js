import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

const LoadingButtonPrimary = styled(LoadingButton)(({ theme }) => ({
  background: theme?.button?.primary,
  color: theme?.button?.ternary,
  margin: '5px',
  padding: '10px 20px',
  borderRadius: '25px',
  minWidth: 'unset',
  '&.Mui-focused': {
    background: theme?.button?.primary,
  },
  '&:hover': {
    background: theme?.button?.primary
  },
  '& .MuiLoadingButton-loadingIndicator': {
    color: '#fff'
  },
  '&.Mui-disabled': {
    backgroundColor: '#dedede !important',
    color: '#fff'
  },
  fontFamily: 'poppins'
}));

const LoadingButtonPrimaryNext = styled(LoadingButton)(({ theme }) => ({
  background: theme?.button?.primary,
  color: theme?.button?.ternary,
  margin: '5px',
  padding: '10px 20px',
  minWidth: 'unset',
  '&.Mui-focused': {
    background: theme?.button?.primary,
  },
  '&:hover': {
    background: theme?.button?.primary
  },
  '& .MuiLoadingButton-loadingIndicator': {
    color: '#fff'
  },
  '&.Mui-disabled': {
    backgroundColor: '#dedede !important',
    color: '#fff'
  }
}));

const ButtonPrimary = styled(Button)(({ theme }) => ({
  background: theme?.button?.primary,
  color: theme?.button?.ternary,
  margin: '5px',
  padding: '10px',
  fontSize: '13px',
  '&.Mui-focused': {
    background: theme?.button?.primary,
  },
  '&:hover': {
    background: theme?.button?.primary
  },
  '&.Mui-disabled': {
    backgroundColor: 'grey !important',
    color: '#fff'
  }
}));

const ButtonSecondary = styled(Button)(({ theme }) => ({
  background: theme?.button?.secondary,
  color: theme?.button?.primary,
  margin: '5px',
  padding: '10px',
  '&.Mui-focused': {
    background: theme?.background?.secondary,
    color: theme?.button?.ternary
  },
  '&:hover': {
    background: theme?.background?.secondary,
    color: theme?.button?.ternary
  },
}));

const ButtonTernary = styled(Button)(({
  theme,
  margin,
  padding,
  fontSize,
  fontWeight
}) => ({
  background: '#fff !important',
  color: theme?.button?.primary,
  margin: margin ?? '5px',
  padding: padding ?? '10px',
  '&.Mui-focused': {
    background: theme?.background?.secondary,
  },
  '&:hover': {
    background: theme?.background?.secondary,
  },
  fontSize,
  fontWeight
}));

const ButtonQuaternary = styled(Button)(({ theme }) => ({
  background: 'none',
  color: theme?.text?.ternary,
  margin: '0',
  padding: '0',
  borderRadius: '0',
  boxShadow: 'none',
  minWidth: '45px',
  height: '33px',
  '&.Mui-focused': {
    background: 'none',
    boxShadow: 'none',
  },
  '&:hover': {
    background: 'none',
    boxShadow: 'none',
  },
}));

const SuccessButton = styled(Button)(() => ({
  background: '#F3FFF3',
  color: '#2e7d32',
  margin: '5px',
  padding: '10px',
  fontSize: '13px',
  minWidth: '45px',
  fontWeight: '900',
  textTransform: 'none',
  '&.Mui-focused': {
    background: '#ccebce',
    color: '#2e7d32',
  },
  '&:hover': {
    background: '#ccebce',
    color: '#2e7d32',
  },
}));

const DeleteButton = styled(Button)(() => ({
  background: '#fce8e8',
  color: '#EB5050',
  margin: '5px',
  padding: '10px',
  fontSize: '13px',
  minWidth: '45px',
  fontWeight: '900',
  textTransform: 'none',
  '&.Mui-focused': {
    background: '#FCF1F1',
    color: '#EB5050',
  },
  '&:hover': {
    background: '#FCF1F1',
    color: '#EB5050',
  },
}));

export {
  ButtonPrimary,
  ButtonSecondary,
  ButtonTernary,
  ButtonQuaternary,
  LoadingButtonPrimary,
  LoadingButtonPrimaryNext,
  DeleteButton,
  SuccessButton
};
