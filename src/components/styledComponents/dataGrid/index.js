import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { styled } from '@mui/material/styles';

const DataGridStyled = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme?.background?.primary,
    color: theme.text?.ternary,
    fontSize: '15px',
    '& .MuiCheckbox-root': {
      color: `${theme.text?.ternary} !important`,
    },
    '& .MuiIconButton-root': {
      color: `${theme.text?.ternary} !important`,
    },
    fontFamily: theme?.fontFamily?.font,
  },
  '& .Mui-selected': {
    backgroundColor: `${theme.background?.secondary} !important`,
    color: `${theme.text?.ternary} !important`,
    '& .MuiCheckbox-root': {
      color: `${theme.text?.ternary} !important`,
    },
    fontFamily: theme?.fontFamily?.font
  },
  '& .MuiDataGrid-row:hover': {
    // backgroundColor: `${theme.background?.secondary} !important`,
    backgroundColor: '#754e9942',
    // color: `${theme.text?.ternary} !important`,
    '& .MuiCheckbox-root': {
      color: `${theme.text?.ternary} !important`,
    },
    fontFamily: theme?.fontFamily?.font
  },
  '& .MuiList-root': {
    '& .MuiMenuItem-root:hover': {
      backgroundColor: `${theme.background?.secondary} !important`,
      fontFamily: theme?.fontFamily?.font,
    }
  },
  '& .MuiTablePagination-selectIcon': {
    color: `${theme.background?.primary}`,
    fontFamily: theme?.fontFamily?.font
  },
  '& .MuiDataGrid-rowCount': {
    fontFamily: theme?.fontFamily?.font
  },
  '& .MuiTablePagination-selectLabel': {
    fontFamily: theme?.fontFamily?.font
  },
  '& .MuiTablePagination-displayedRows': {
    fontFamily: theme?.fontFamily?.font
  },
  '& .MuiTablePagination-actions': {
    fontFamily: theme?.fontFamily?.font
  }

}));

export default DataGridStyled;
