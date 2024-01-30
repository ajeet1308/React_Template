import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const ContainerPrimary = styled(Container)(({ margin, padding }) => ({
  margin,
  padding
}));

const ContainerStyled = styled(Container)(({ theme }) => ({
  boxShadow: `${theme?.boxShadow?.primary} 0px 2px 8px`,
  marginTop: '50px',
  marginBottom: '50px',
  padding: '0 !important',
}));

export {
  ContainerPrimary,
  ContainerStyled
};
