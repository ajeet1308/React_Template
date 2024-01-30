import {
  DialogActions, DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  color: theme?.text?.primary,
  // background: theme?.background?.secondary,
  fontWeight: '600',
}));

const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  color: theme?.text?.primary,
  // background: theme?.background?.secondary,
  fontWeight: '600',
}));

export {
  DialogTitleStyled,
  DialogActionsStyled
};
